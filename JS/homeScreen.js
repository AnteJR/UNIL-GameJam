scene("homeScreen", () => {
    const flagFR = add([
        sprite("fr_btn"),
        anchor("top"),
        pos(innerWidth / 2, innerHeight / 10),
        scale(proportion),
        area(),
        { value: "fr" },
        "french",
        "startButton"
    ]);

    const flagENG = add([
        sprite("eng_btn"),
        anchor("top"),
        pos(innerWidth / 2, innerHeight / 2),
        scale(proportion),
        area(),
        { value: "eng" },
        "english",
        "startButton"
    ]);

    onClick("startButton", (e) => {
        if (e.value == "fr") LANG = "FR";
        else if (e.value == "eng") LANG = "ENG";

        console.log(LANG)

        const playerSound = play('bike-roll-snow', {
            loop: true,
            volume: 0.5,
        });

        go("game", { playerSound: playerSound });
    })
});

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