const BOARD_LENGTH = 30

var rules = {
    0: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-map-marker-alt\"></i></span> Départ !</h4>",
    1: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> Tu as de la chance</h4>",
    2: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> Tu as fait mouche</h4>",
    3: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-fighter-jet\"></i></span> Avance de 2 cases</h4>",
    4: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> Tu as oublié ta tête sous l’oreiller</h4>",
    5: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> Tu peux le faire</h4>",
    6: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    7: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-hand-paper\"></i></span> Passe ton tour</h4>",
    8: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-undo\"></i></span> Retourne à la case départ</h4>",
    9: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fab fa-bitcoin\"></i></span> Tu gagnes 5 Satoshi</h4>",
    10: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-fighter-jet\"></i></span> Avance de 2 cases</h4>",
    11: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> On se réveille enfin</h4>",
    12: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    13: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-rocket\"></i></span> Avance de 3 cases</h4>",
    14: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-laugh-beam\"></i></span> Go à la case <span class=\"badge badge-pill badge-primary\">19</span></h4>",
    15: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-hand-paper\"></i></span> Passe ton tour</h4>",
    16: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> La vie est trop courte</h4>",
    17: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fab fa-bitcoin\"></i></span> Tu gagnes 5 Satoshi</h4>",
    18: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    19: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fab fa-bitcoin\"></i></span> Tu gagnes 5 Satoshi</h4>",
    20: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-fighter-jet\"></i></span> Avance de 2 cases</h4>",
    21: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> Tu vas y arriver</h4>",
    22: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> Quelle adresse</h4>",
    23: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-tired\"></i></span> Recule de 2 cases</h4>",
    24: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-dice\"></i></span> Relance le dés</h4>",
    25: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-grimace\"></i></span> Go à la case <span class=\"badge badge-pill badge-primary\">21</span></h4>",
    26: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> T'es pas drôle</h4>",
    27: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> Rien ne vaut plus que cette case</h4>",
    28: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> Tu y es presque</h4>",
    29: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-smile-beam\"></i></span> Tu dois faire un <span class=\"badge badge-pill badge-success\">1</span> mainteant</h4>",
    30: "<h4><span class=\"badge badge-pill badge-dark\"><i class=\"fas fa-medal\"></i></span> Arrivée ! Tu gagnes 20 Satoshi <i class=\"fab fa-bitcoin\"></i></h4>",
}

var dices = {
    1: "dice-one",
    2: "dice-two",
    3: "dice-three",
    4: "dice-four",
    5: "dice-five",
    6: "dice-six",
}

var dicesBackground = {
    1: "danger",
    2: "secondary",
    3: "primary",
    4: "info",
    5: "dark",
    6: "success"
}

var updateGames = (step = 1) => {
    let integer = parseInt($("#step").val(), 10)
    // check current value
    if (isNaN(integer) || integer < 0 || (integer + step) < 0) {
        integer = 0
    } else if (integer > BOARD_LENGTH) {
        integer = BOARD_LENGTH
    } else if ((integer + step) > BOARD_LENGTH) {
        integer = BOARD_LENGTH - (integer + step - BOARD_LENGTH)
    } else {
        integer = integer + step
    }

    $("#step").val(integer.toString())
    $("#rules-desc").html(rules[integer])

}

$(document).ready(function () {
    // Init
    $("#rules-desc").html(rules[0])

    // Dice
    $("#dice-button").on("click", (event) => {
        event.preventDefault()
        // Update the dice value
        let diceVal = Math.round(Math.random() * 5) + 1
        $("#dice").html("<i class=\"fas fa-" + dices[diceVal].toString() + "\"></i>")
        // Update dice background color
        $("#dice").animate({ opacity: 0.4 }, 500,
            () => {
                $("#dice").css("opacity", 1)
                updateGames(diceVal)
            })
        $("#dice-button").prev().removeClass().addClass("card text-white mb-1 bg-" + dicesBackground[diceVal].toString())
    })

    // Rules
    $("#rules-plus").on("click", (event) => {
        event.preventDefault()
        updateGames(1)
    })

    $("#rules-minus").on("click", (event) => {
        event.preventDefault()
        updateGames(-1)
    })

    // Step
    $("#step").on("keypress", (event) => {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == "13") {
            event.preventDefault()
            updateGames(0)
        }
    });
});

