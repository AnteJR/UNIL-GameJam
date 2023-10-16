scene("endScreen", ({ score }) => {
    const bg = add([
        sprite("mainBG", { anim: "homeScreen" }),
        scale(proportion),
        pos(innerWidth / 2, innerHeight),
        anchor("bot")
    ]);

    /*-------------------------------
        TEXTES ÉCRAN FINAL
    -------------------------------*/
    const victoryTxt = addTxtMenu(texte[LANG].final, [Math.floor(innerWidth / 2), Math.floor(innerHeight / 50)], "pixelOutlined", "center", 9, "top", 9);
    const smallVictoryTxt = addTxtMenu(texte[LANG].finalSmall, [Math.floor(innerWidth / 2), Math.floor(innerHeight / 50 * 3) + victoryTxt.height], "pixeldOutlined", "center", 6, "top", 6);
    const scoreTxt = addTxtMenu(texte[LANG].scoring + score + texte[LANG].objectif, [Math.floor(innerWidth / 2), Math.floor(innerHeight / 50 * 5) + victoryTxt.height + smallVictoryTxt.height], "pixeldOutlined", "center", 6, "top", 6);

    /*-------------------------------
        BOUTONS ÉCRAN FINAL
    -------------------------------*/
    const replayBtn = add([
        sprite("replay_btn", { anim: "default" }),
        anchor("botright"),
        pos(Math.floor(innerWidth / 2 - innerWidth / 100), Math.floor(innerHeight / 50 * 47)),
        scale(proportion),
        area(),
        { role: "replay" },
        "replay",
        "endButton"
    ]);

    const homeBtn = add([
        sprite("home_btn", { anim: "default" }),
        anchor("botleft"),
        pos(Math.floor(innerWidth / 2 + innerWidth / 100), Math.floor(innerHeight / 50 * 47)),
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
            go("game", { playerSound: playerSound });
        }
    }, 250);
}