scene("game", () => {

    // reinitialize global variables
    friendsPlaced = 0;
    obstaclesPlaced = 0;
    /*-----------------------
        MUSIC AND SOUNDS
    -----------------------*/
    // ADD MUSIC AND SOUNDS HERE (if they need to be triggered on scene load)

    /*----------------
        BACKGROUND
    -----------------*/
    // background for desktop overflow
    const bg = add([
        rect(innerWidth, innerHeight),
        color(116, 183, 237)
    ]);

    background = add([
        pos(innerWidth / 2, innerHeight),
        scale(proportion),
        "background"
    ]);

    onUpdate("background", (b) => {
        if (b.pos.y >= (terrainLength * (-1)) * proportion) {
            b.pos.y = (terrainLength * (-1)) * proportion;

            playerSound.volume = 0;
            player.play("idle");

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