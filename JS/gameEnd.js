scene("endScreen", ({ score }) => {
    const bgEndScreen = add([
        // custom background here
        rect(innerWidth, innerHeight),
        color(116, 183, 237)
    ]);

    /*-------------------------------
        TEXTES ÉCRAN FINAL
    -------------------------------*/
    const victoryTxtShadow = add([
        text(texte[LANG].final, {
            font: "testFont",
            align: "center",
            size: 9 * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: 10
        }),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 50)),
        anchor("top"),
        color(0, 0, 0),
    ]);

    const victoryTxt = victoryTxtShadow.add([
        text(texte[LANG].final, {
            font: "testFont",
            align: "center",
            size: 9 * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: 10
        }),
        pos(-innerWidth / (1000 / proportion), -innerHeight / (1000 / proportion)),
        anchor("top"),
    ]);

    const smallVictoryTxtShadow = add([
        text(texte[LANG].finalSmall, {
            font: "testFont",
            align: "center",
            size: 6 * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: 10
        }),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 50 * 3) + victoryTxt.height),
        anchor("top"),
        color(0, 0, 0),
    ]);

    const smallVictoryTxt = smallVictoryTxtShadow.add([
        text(texte[LANG].finalSmall, {
            font: "testFont",
            align: "center",
            size: 6 * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: 10
        }),
        pos(-innerWidth / (1200 / proportion), -innerHeight / (1200 / proportion)),
        anchor("top")
    ]);

    const scoreTxtShadow = add([
        text(texte[LANG].scoring + score + texte[LANG].objectif, {
            font: "testFont",
            align: "center",
            size: 6 * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: 10
        }),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 50 * 5) + victoryTxt.height + smallVictoryTxt.height),
        anchor("top"),
        color(0, 0, 0)
    ]);

    const scoreTxt = scoreTxtShadow.add([
        text(texte[LANG].scoring + score + texte[LANG].objectif, {
            font: "testFont",
            align: "center",
            size: 6 * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: 10
        }),
        pos(-innerWidth / (1200 / proportion), -innerHeight / (1200 / proportion)),
        anchor("top")
    ]);

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