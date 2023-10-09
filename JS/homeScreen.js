scene("homeScreen", () => {
    const flagFR = add([
        sprite("fr_btn", { anim: "default" }),
        anchor("top"),
        pos(innerWidth / 2, innerHeight / 10),
        scale(proportion),
        area(),
        { value: "fr" },
        "french",
        "startButton"
    ]);

    const flagENG = add([
        sprite("eng_btn", { anim: "default" }),
        anchor("top"),
        pos(innerWidth / 2, innerHeight / 2),
        scale(proportion),
        area(),
        { value: "eng" },
        "english",
        "startButton"
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