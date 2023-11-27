scene("startScreen", () => {
    const bg = add([
        sprite("mainBG", { anim: "homeScreen" }),
        scale(proportion),
        pos(innerWidth / 2, innerHeight),
        anchor("bot"),
        color(20, 100, 200)
    ]);

    /*-------------------------------
        BOUTONS ÉCRAN ACCUEIL
    -------------------------------*/
    const startBtn = add([
        sprite("start_btn", { anim: "default" }),
        anchor("center"),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 2)),
        scale(proportion < 4 ? proportion : proportion -1),
        area(),
        "startButton"
    ]);

    /*-------------------------------
        ONCLICK ET ONTOUCH
    -------------------------------*/
    onClick("startButton", (e) => start(e));
    onTouchStart((i, p) => {
        if (startBtn.hasPoint(i)) start(startBtn);
    });
});z

/*-------------------------------
    GAME LAUNCH
-------------------------------*/
function start(e) {
    e.play("clicked")

    setTimeout(() => {
        go("homeScreen");
        play('intro-icta', { volume: 0.6 }).onEnd(() => {
            musicTrack.play();
        });
        musicTrack = play('its-christmas-time-again', {
            paused:true,
            loop: true,
            volume: 1
        });
    }, 250);
}
/*-------------------------------
    GAME INITIALIZATION
-------------------------------*/
function initGame() {
    go("startScreen");
}

initGame();
