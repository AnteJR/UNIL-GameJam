scene("endScreen", ({ score }) => {
    const bgEndScreen = add([
        // custom background here
    ]);

    /*-------------------------------
        TEXTES ÉCRAN FINAL
    -------------------------------*/
    const victoryTxt = add([
        text(texte[LANG].final, {
            font: "pixelFont",
            align: "center",
            size: proportion < 6 ? 10 * proportion : (proportion < 15 ? 8 * proportion : 6 * proportion),
            width: (130 * proportion),
        }),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 50)),
        anchor("top")
    ]);

    const smallVictoryTxt = add([
        text(texte[LANG].finalSmall, {
            font: "pixelFont",
            align: "center",
            size: proportion < 6 ? 8 * proportion : (proportion < 15 ? 6 * proportion : 3 * proportion),
            width: 130 * proportion,
        }),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 50 * 3) + victoryTxt.height),
        anchor("top")
    ]);

    const scoreTxt = add([
        text(texte[LANG].scoring + score + texte[LANG].objectif, {
            font: "pixelFont",
            align: "center",
            size: proportion < 6 ? 8 * proportion : (proportion < 15 ? 6 * proportion : 3 * proportion),
            width: 130 * proportion,
        }),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 50 * 5) + victoryTxt.height + smallVictoryTxt.height),
        anchor("top")
    ]);

    /*-------------------------------
        BOUTONS ÉCRAN FINAL
    -------------------------------*/
    const replayBtn = add([
        sprite("replay_btn", { anim: "default" }),
        anchor("botright"),
        pos(Math.floor(innerWidth / 2 - innerWidth / 100), Math.floor(innerHeight / 50 * 48)),
        scale(proportion),
        area(),
        { role: "replay" },
        "replay",
        "endButton"
    ]);

    const homeBtn = add([
        sprite("home_btn", { anim: "default" }),
        anchor("botleft"),
        pos(Math.floor(innerWidth / 2 + innerWidth / 100), Math.floor(innerHeight / 50 * 48)),
        scale(proportion),
        area(),
        { role: "home" },
        "home",
        "endButton"
    ]);

    /*-------------------------------
        ONCLICK ET ONTOUCH
    -------------------------------*/
    onClick("endButton", (e) => endMenu(e));
    onTouchStart((i, p) => {
        if (replayBtn.hasPoint(i)) endMenu(replayBtn);
        else if (homeBtn.hasPoint(i)) endMenu(homeBtn);
    });
});

/*-------------------------------
    BUTTONS' INTERACTIONS
-------------------------------*/
function endMenu(e) {
    e.play("clicked")

    setTimeout(() => {
        if (e.role == "home") window.open("https://unil.ch/voeux", "_blank"); // change link if needed
        else if (e.role == "replay") {
            firstPress = false;
            speed = 0;
            acceleration = 0;
            isMousePressed = false;
            go("game", { playerSound: playerSound });
        }
    }, 250);
}