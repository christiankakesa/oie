
var rules = {
    0: "Départ !",
    1: "Peux mieux faire :))",
    2: "Bof !",
    3: "Hi hi hi hi !!!",
    4: "Qu'est ce que tu croyais ?",
    5: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-fighter-jet\"></i></span> Avance de 2 cases</h4>",
    6: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    7: "Passe ton tour ;-)",
    8: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-toilet\"></i></span> Retourne à la case départ</h4>",
    9: "Qu'est ce que t'as cru !",
    10: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-fighter-jet\"></i></span> Avance de 2 cases</h4>",
    11: "Salut la famille !",
    12: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    13: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-rocket\"></i></span> Avance de 3 cases</h4>",
    14: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-laugh-beam\"></i></span> Va à la case <span class=\"badge badge-pill badge-dark\">19</span></h4>",
    15: "Passe ton tour ;-)",
    16: "Rien du tout",
    17: "Ok",
    18: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    19: "C'est ouf, il n'y a rien !",
    20: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-fighter-jet\"></i></span> Avance de 2 cases</h4>",
    21: "Rien du tout",
    22: "Tu as eu chaud !",
    23: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-tired\"></i></span> Recule de 2 cases</h4>",
    24: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    25: "Go à la case <span class=\"badge badge-pill badge-dark\">21</span>",
    26: "Regarde le ciel",
    27: "Il fait beau ici",
    28: "Il n'y a rien ici !",
    29: "Tu y es presque ;-)",
    30: "Arrivée !",
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
