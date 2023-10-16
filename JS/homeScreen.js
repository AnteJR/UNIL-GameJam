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
    let size = proportion < 4 ? 6 : 5;
    addTxtMenu(texte.FR.accueil, [Math.floor(innerWidth / 2), Math.floor((innerHeight / 5) + (innerHeight / 50))], "testFont", "center", size, "top", size);
    addTxtMenu(texte.ENG.accueil, [Math.floor(innerWidth / 2), Math.floor(((innerHeight / 20) * 10) + (innerHeight / 50))], "testFont", "center", size, "top", size);

    /*-------------------------------
        BOUTONS ÉCRAN ACCUEIL
    -------------------------------*/
    const flagFR = add([
        sprite("fr_btn", { anim: "default" }),
        anchor("bot"),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 5)),
        scale(proportion < 4 ? proportion : proportion -1),
        area(),
        { value: "fr" },
        "french",
        "startButton"
    ]);

    const flagENG = add([
        sprite("eng_btn", { anim: "default" }),
        anchor("bot"),
        pos(innerWidth / 2, (innerHeight / 20) * 10),
        scale(proportion < 4 ? proportion : proportion -1),
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