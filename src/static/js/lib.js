
var rules = {
    0: "Départ !",
    1: "Peux mieux faire :))",
    2: "Pas mal, mais  <strong>2</strong>",
    3: "Hi hi hi hi !!!",
    4: "Qu'est ce que tu croyais ?",
    5: "Avance de 2 cases",
    6: "Rejoue",
    7: "Passe ton tour ;-)))))",
    8: "Retourne à la case départ",
    9: "Qu'est ce que t'as cru !",
    10: "Avance de 2 cases",
    11: "Salut la famille !",
    12: "Rejoue",
    13: "Avance de 3 cases",
    14: "Va à la case <span class=\"badge badge-dark\">19</span>",
    15: "Passe ton tour ;-)))))",
    16: "Rien du tout",
    17: "Ok",
    18: "Rejoue",
    19: "C'est ouf, il n'y a rien !",
    20: "Avance de 2 cases",
    21: "Rien du tout",
    22: "Tu as eu chaud !",
    23: "Recule de 2 cases",
    24: "Rejoue",
    25: "Go à la case <span class=\"badge badge-dark\">21</span>",
    26: "Regarde le ciel",
    27: "Il fait beau ici",
    28: "Il n'y a rien ici !",
    29: "Tu y es presque ;))",
    30: "Arrivée !",
}
$(document).ready(function () {
    // Init
    $("#rules-desc").text(rules[0])

    // Dice
    $("#dice-button").on("click", () => {
        let val = Math.round(Math.random() * 5) + 1
        return $("#dice").text(val)
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
