scene("homeScreen", () => {
    const bg = add([
        // custom background here
    ]);

    console.log(proportion)

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

    const txtFR = add([
        text("[wavy]Aide Sheepy à collecter les voeux de la communauté UNIL ![/wavy]", {
            font: "pixelFont",
            size: proportion < 6 ? 8 * proportion : (proportion < 15 ? 6 * proportion : 3 * proportion),
            width: proportion < 6 ? Math.floor((innerWidth / 5) * 4) : Math.floor(innerWidth / 2),
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
            width: proportion < 6 ? Math.floor((innerWidth / 5) * 4) : Math.floor(innerWidth / 2),
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

    onClick("startButton", (e) => launch(e));
    onTouchStart((i, p) => {
        if (flagENG.hasPoint(i)) launch(flagENG);
        else if (flagFR.hasPoint(i)) launch(flagFR);
    });
});

function launch(e) {
    if (e.value == "fr") LANG = "FR";
    else if (e.value == "eng") LANG = "ENG";

    e.play("clicked")

    setTimeout(() => {
        const playerSound = play('bike-roll-snow', {
            loop: true,
            volume: 0.5,
        });

        go("game", { playerSound: playerSound });
    }, 250)
}

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