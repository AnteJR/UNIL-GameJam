scene("game", () => {
    // reinitialize global variables
    firstPress = false;
    isMousePressed = false;
    speed = 0;
    acceleration = 0;
    friendsPlaced = 0;
    obstaclesPlaced = 0;
    /*-----------------------
        MUSIC AND SOUNDS
    -----------------------*/
    // ADD MUSIC AND SOUNDS HERE (if they need to be triggered on scene load)

    /*----------------
        BACKGROUND
    -----------------*/
    background = add([
        pos(innerWidth / 2, innerHeight),
        scale(proportion),
        "background"
    ]);

    onUpdate("background", (b) => {
        if (b.pos.y >= -terrainLength * proportion) {
            b.pos.y = -terrainLength * proportion;

            isGameOver = true;
            playerSound.volume = 0;
            player.play("idle");
            jaugeIn.destroy();
            jaugeOut.destroy();

            wait(8, () => {
                go("endScreen", { score: player.greetingsCaught });
            })
        } else {
            accelerate(b);
        }
    });

    addBackground();

    // COMPUTER BACKGROUND IMAGE
    add([
        sprite("computer_background"),
        fixed(),
        scale(4),
        z(-100)
    ])

    /*-----------------------------------------------
        DEBUG MODE HERE
    ------------------------------------------------*/
    if (debugOn) {
        launchDebug();
    }

    /*-----------------------------------------------
        PLAYER CHARACTER AND INTERACTIONS HERE
    ------------------------------------------------*/
    setPlayer();

    /*-----------------------------------------------
        ENTITIES SPAWN HERE
    ------------------------------------------------*/
    setEntities();

    /*-----------------------------------------------
        SPEED-O-METER HERE
    ------------------------------------------------*/
    speedOMeter();

    /*-----------------------------------------------
        CONTROLS GO HERE
    ------------------------------------------------*/
    addControls();

    onTouchStart(actionPressed);
    onTouchEnd(actionReleased);
    onMousePress(actionPressed);
    onMouseRelease(actionReleased);
    onKeyPress("space", actionPressed);
    onKeyRelease("space", actionReleased);

    function actionPressed() {
        if (!firstPress) gameStartNow();
        isMousePressed = true;
        playerSounds()
    }
    
    function actionReleased() {
        isMousePressed = false;
        acceleration = 0.1;
    }
});

function playerSounds() {
    if (!isGameOver) play('woosh2');
    play('sonnette-velo', {
        volume: 0.3
    });
}

function gameStartNow() {
    firstPress = true;
    player.play("up");
    playerSound.volume = 0.5;
}