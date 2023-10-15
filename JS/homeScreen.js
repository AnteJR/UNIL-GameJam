scene("homeScreen", () => {
    const bg = add([
        sprite("mainBG", { anim: "homeScreen" }),
        scale(proportion),
        pos(innerWidth / 2, innerHeight),
        anchor("bot")

    ]);

    /*-------------------------------
        TEXTES ÉCRAN ACCUEIL
    -------------------------------*/
    const txtFRShadow = add([
        text(texte.FR.accueil, {
            font: "testFont",
            align: "center",
            size: 8 * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: 10
        }),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 5 + innerHeight / 50)),
        anchor("top"),
        color(0, 0, 0),
    ]);

    const txtFR = txtFRShadow.add([
        text(texte.FR.accueil, {
            font: "testFont",
            align: "center",
            size: 8 * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: 10
        }),
        pos(-innerWidth / (1000 / proportion), -innerHeight / (1000 / proportion)),
        anchor("top")
    ]);

    const txtENGShadow = add([
        text(texte.ENG.accueil, {
            font: "testFont",
            align: "center",
            size: 8 * proportion,
            width: 150 * (proportion - 1),
            lineSpacing: 10
        }),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 10 * 6.5 + innerHeight / 50)),
        anchor("top"),
        color(0, 0, 0),
    ]);

    const txtENG = txtENGShadow.add([
        text(texte.ENG.accueil, {
            font: "testFont",
            align: "center",
            size: 8 * proportion,
            width: 150 * (proportion - 1),
            lineSpacing: 10
        }),
        pos(-innerWidth / (1000 / proportion), -innerHeight / (1000 / proportion)),
        anchor("top")
    ]);

    /* const txtFR = add([
        sprite("txtFR"),
        pos(innerWidth / 2, proportion < 6 ? Math.floor(innerHeight / 5 + innerHeight / 100) : Math.floor(innerHeight / 4 + innerHeight / 50)),
        anchor("top"),
        scale(proportion < 5 ? proportion - 1 : (proportion < 7 ? 3 : 4))
    ]);

    const txtENG = add([
        sprite("txtENG"),
        pos(innerWidth / 2, proportion < 6 ? Math.floor((innerHeight / 10) * 7 + innerHeight / 50) : Math.floor((innerHeight / 10) * 7 + innerHeight / 50)),
        anchor("top"),
        scale(proportion < 5 ? proportion - 1 : (proportion < 7 ? 3 : 4))
    ]); */

    /*-------------------------------
        BOUTONS ÉCRAN ACCUEIL
    -------------------------------*/
    const flagFR = add([
        sprite("fr_btn", { anim: "default" }),
        anchor("bot"),
        pos(innerWidth / 2, proportion < 6 ? innerHeight / 5 : innerHeight / 4),
        scale(proportion < 6 ? (proportion - 1) : 4),
        area(),
        { value: "fr" },
        "french",
        "startButton"
    ]);

    const flagENG = add([
        sprite("eng_btn", { anim: "default" }),
        anchor("bot"),
        pos(innerWidth / 2, (innerHeight / 10) * 6.5),
        scale(proportion < 6 ? (proportion - 1) : 4),
        area(),
        { value: "eng" },
        "english",
        "startButton"
    ]);

    /*-------------------------------
        ONCLICK ET ONTOUCH
    -------------------------------*/
    onClick("startButton", (e) => launch(e));
    onTouchStart((i, p) => {
        if (flagENG.hasPoint(i)) launch(flagENG);
        else if (flagFR.hasPoint(i)) launch(flagFR);
    });
});

/*-------------------------------
    GAME LAUNCH
-------------------------------*/
function launch(e) {
    LANG = e.value.toUpperCase();

    e.play("clicked")

    setTimeout(() => {
        go("game");
    }, 250);
}

/*-------------------------------
    GAME INITIALIZATION
-------------------------------*/
function initGame() {
    go("homeScreen");
}

function isLocalStorageAvailable() {
    var test = 'test';
    try {
        localStorage.setItem("testLS", test);
        localStorage.removeItem("testLS");
        return true;
    } catch (e) {
        return false;
    }
}

if (isLocalStorageAvailable()) {
    initGame();
}