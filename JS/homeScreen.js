scene("homeScreen", () => {
    const bg = add([
        // custom background here
        rect(innerWidth, innerHeight),
        color(116, 183, 237)
    ]);

    /*-------------------------------
        TEXTES ÉCRAN ACCUEIL
    -------------------------------*/
    const txtFR = add([
        text("[wavy]Aide Sheepy à collecter les voeux de la communauté UNIL ![/wavy]", {
            font: "pixelFont",
            size: proportion < 6 ? 8 * proportion : (proportion < 15 ? 6 * proportion : 3 * proportion),
            width: Math.floor(scale_incomplete) < proportion ? 130 * (proportion - 1) : 130 * proportion,
            align: "center",
            styles: {
                "wavy": (idx, ch) => ({
                    pos: vec2(0, wave(-1, 1, time() + idx * 0.1)),
                }),
            },
        }),
        pos(innerWidth / 2, proportion < 6 ? Math.floor(innerHeight / 5 + innerHeight / 50) : Math.floor(innerHeight / 4 + innerHeight / 50)),
        anchor("top")
    ]);

    const txtENG = add([
        text("[wavy]Help Sheepy collect holiday greetings cards![/wavy]", {
            font: "pixelFont",
            size: proportion < 6 ? 8 * proportion : (proportion < 15 ? 6 * proportion : 3 * proportion),
            width: Math.floor(scale_incomplete) < proportion ? 130 * (proportion - 1) : 130 * proportion,
            align: "center",
            styles: {
                "wavy": (idx, ch) => ({
                    pos: vec2(0, wave(-1, 1, time() + idx * 0.1)),
                }),
            },
        }),
        pos(innerWidth / 2, proportion < 6 ? Math.floor((innerHeight / 10) * 7 + innerHeight / 50) : Math.floor((innerHeight / 10) * 7 + innerHeight / 50)),
        anchor("top")
    ]);

    /*-------------------------------
        BOUTONS ÉCRAN ACCUEIL
    -------------------------------*/
    const flagFR = add([
        sprite("fr_btn", { anim: "default" }),
        anchor("bot"),
        pos(innerWidth / 2, proportion < 6 ? innerHeight / 5 : innerHeight / 4),
        scale(proportion < 6 ? proportion : 7),
        area(),
        { value: "fr" },
        "french",
        "startButton"
    ]);

    const flagENG = add([
        sprite("eng_btn", { anim: "default" }),
        anchor("bot"),
        pos(innerWidth / 2, (innerHeight / 10) * 7),
        scale(proportion < 6 ? proportion : 7),
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