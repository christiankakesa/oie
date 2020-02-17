require "baked_file_system"
require "logger"
require "option_parser"
require "router"

struct Config
  property server, port

  def initialize(
    @server : String = "0.0.0.0",
    @port : Int32 = 3000
  )
  end
end

CONFIG = Config.new

OptionParser.parse do |opts|
  opts.on("-s SERVER", "--server SERVER", "define the server host server") do |opt|
    CONFIG.server = opt
  end
  opts.on("-p PORT", "--port PORT", "define port to run server") do |opt|
    CONFIG.port = opt.to_i
  end
  opts.invalid_option do |flag|
    STDERR.puts "ERROR: #{flag} is not a valid option."
    STDERR.puts opts
  end
end

STDOUT.sync = true
L = Logger.new(STDOUT)
L.not_nil!.level = ::Logger::DEBUG if ENV["DEBUG"]?

class Filesystem
  extend BakedFileSystem

  bake_folder "./static"

  def self.serve(file, context)
    req = context.request
    resp = context.response
    resp.status_code = 200
    resp.content_type = MIME.from_filename(file.path)
    if req.headers["Accept-Encoding"]? =~ /gzip/
      resp.headers["Content-Encoding"] = "gzip"
      resp.content_length = file.compressed_size
      resp.write(file.to_slice)
    else
      resp.content_length = file.size
      resp.print Filesystem.get(file.path).gets_to_end
    end
    context
  end
end

class WebServer
  include Router

  def routes
    get "/" do |context, _params|
      file_path = "index.html"
      req = context.request
      resp = context.response
      resp.content_type = MIME.from_filename(file_path)
      if req.headers["Accept-Encoding"]? =~ /gzip/
        resp.headers["Content-Encoding"] = "gzip"
        resp.content_length = Filesystem.get(file_path).compressed_size
        resp.write(Filesystem.get(file_path).to_slice)
      else
        context.response.content_length = Filesystem.get(file_path).size
        context.response.print Filesystem.get(file_path).gets_to_end
      end
      context
    end
  end

  def run
    Filesystem.files.each do |file|
      get file.path do |context, _params|
        Filesystem.serve(file, context)
      end
    end
    routes

    handlers = [
      HTTP::LogHandler.new(STDOUT),
      HTTP::ErrorHandler.new,
      route_handler,
    ]

    server = HTTP::Server.new(handlers)
    server.bind_tcp(CONFIG.server, CONFIG.port)
    L.info "Starting the webapp at: #{CONFIG.server}:#{CONFIG.port}"
    server.listen
  end
end

WebServer.new.run
