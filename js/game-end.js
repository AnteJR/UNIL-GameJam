scene("endScreen", ({ score }) => {
    let replayBtn;
    
    /*-------------------------------
        TEXTES ÉCRAN FINAL
    -------------------------------*/
    const line1 = addTxtMenu(texte[LANG].final, [Math.floor(innerWidth / 2), 94], "pixelOutlined", "center", 9, "top", 9);
    const line2 = addTxtMenu(texte[LANG].finalSmall, [Math.floor(innerWidth / 2), 40 + line1.pos.y + line1.height], "pixelOutlined", "center", 6, "top", 6);

    // Transition to second page
    wait(10, () => {
        line2.destroy();

        const scoreTxt = addTxtMenu(texte[LANG].scoring + score + texte[LANG].objectif, [Math.floor(innerWidth / 2), 40 + line1.pos.y + line1.height], "pixelOutlined", "center", 6, "top", 6);

        /*-------------------------------
            BOUTONS ÉCRAN FINAL
        -------------------------------*/
        replayBtn = add([
            sprite(`replay_${LANG}`, { anim: "default" }),
            anchor("center"),
            pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 50 * 40)),
            scale(proportion),
            area(),
            "replay",
            "endButton"
        ]);

        //returnToWebPageTimer = wait(10, () => window.open('https://unil.ch/voeux', '_self'));
    })

    /*-------------------------------
        ONCLICK ET ONTOUCH
    -------------------------------*/
    onClick("endButton", (e) => replay(e));
    onTouchStart((i, p) => {
        if (replayBtn.hasPoint(i)) replay(replayBtn);
    });
});

/*-------------------------------
    BUTTONS' INTERACTIONS
-------------------------------*/
function replay(e) {
    e.play("clicked")

    //returnToWebPageTimer.cancel();

    setTimeout(() => {
        go("game", { playerSound: playerSound });
    }, 250);
}