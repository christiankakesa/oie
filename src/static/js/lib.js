
var rules = {
    0: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-map-marker-alt\"></i></span> Départ !</h4>",
    1: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    2: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    3: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    4: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    5: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-fighter-jet\"></i></span> Avance de 2 cases</h4>",
    6: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    7: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-hand-paper\"></i></span> Passe ton tour</h4>",
    8: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-undo\"></i></span> Retourne à la case départ</h4>",
    9: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-bitcoin\"></i></span> Tu gagnes 10 Satoshi</h4>",
    10: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-fighter-jet\"></i></span> Avance de 2 cases</h4>",
    11: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    12: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    13: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-rocket\"></i></span> Avance de 3 cases</h4>",
    14: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-laugh-beam\"></i></span> Va à la case <span class=\"badge badge-pill badge-dark\">19</span></h4>",
    15: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-hand-paper\"></i></span> Passe ton tour</h4>",
    16: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    17: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-bitcoin\"></i></span> Tu gagnes 10 Satoshi</h4>",
    18: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    19: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    20: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-fighter-jet\"></i></span> Avance de 2 cases</h4>",
    21: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    22: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    23: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-tired\"></i></span> Recule de 2 cases</h4>",
    24: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    25: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-grimace\"></i></span> Go à la case <span class=\"badge badge-pill badge-dark\">21</span></h4>",
    26: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    27: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    28: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    29: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> ...</h4>",
    30: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-medal\"></i></span> Arrivée !</h4>",
}

var dices = {
    1: "dice-one",
    2: "dice-two",
    3: "dice-three",
    4: "dice-four",
    5: "dice-five",
    6: "dice-six",
}
$(document).ready(function () {
    // Init
    $("#rules-desc").text(rules[0])

    // Dice
    $("#dice-button").on("click", () => {
        // Update the dice value
        let diceVal = Math.round(Math.random() * 5) + 1
        $("#dice").html("<i class=\"fas fa-" + dices[diceVal].toString() + "\"></i>")
        // Update the number dice was hit
        let counter = parseInt($("#counter-hit").text(), 10) + 1
        $("#counter-hit").text(counter.toString())
    })

    // Rules
    $("#rules-plus").on("click", () => {
        let integer = parseInt($("#step").val(), 10);
        if (isNaN(integer)) {
            integer = 0
        } else if (integer >= 30 || integer < 0) {
            integer = 0
        } else {
            integer = integer + 1
        }
        $("#step").val(integer.toString())
        $("#rules-desc").html(rules[integer])
    })

    $("#rules-minus").on("click", () => {
        let integer = parseInt($("#step").val(), 10);
        if (isNaN(integer)) {
            integer = 0
        } else if (integer <= 0 || integer > 30) {
            integer = 30;
        } else {
            integer = integer - 1
        }

        $("#step").val(integer.toString())
        $("#rules-desc").html(rules[integer])
    })

    // Step
    $("#step").on("keypress", (event) => {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == "13") {
            event.preventDefault()
            let integer = parseInt($("#step").val(), 10)
            if (isNaN(integer)) {
                integer = 0
            } else if (integer < 0) {
                integer = 0
            } else if (integer > 30) {
                integer = 30
            }
            $("#step").val(integer.toString())
            $("#rules-desc").html(rules[integer])
        }
    });
});
