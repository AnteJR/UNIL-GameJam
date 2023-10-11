scene("game", () => {
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
        if (b.pos.y >= (terrainLength * (-1)) * proportion) {
            b.pos.y = (terrainLength * (-1)) * proportion;

            playerSound.volume = 0;
            go("endScreen", { score: player.greetingsCaught });
        }

        accelerate(b);
    });

    addBackground();

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

    onTouchStart(() => {
        if(!firstPress) gameStartNow();
        isMousePressed = true;
        playerSounds()
    });

    onTouchEnd(() => {
        isMousePressed = false
        acceleration = 0.1;
    });

    onMousePress(() => {
        if(!firstPress) gameStartNow();
        isMousePressed = true;
        playerSounds()
    });

    onMouseRelease(() => {
        isMousePressed = false;
        acceleration = 0.1;
    });

    onKeyPress("space", () => {
        if(!firstPress) gameStartNow();
        isMousePressed = true;
        playerSounds()
    });

    onKeyRelease("space", () => {
        isMousePressed = false;
        acceleration = 0.1;
    });
});

function playerSounds() {
    play('woosh2');
    play('sonnette-velo', {
        volume: 0.3
    });
}

function gameStartNow() {
    firstPress = true;
    player.play("up");
    playerSound.volume = 0.5;
}