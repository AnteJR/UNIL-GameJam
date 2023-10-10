scene("game", (playerSound) => {
    /*-----------------------------------------------
        BACKGROUND HERE
    ------------------------------------------------*/
    background = add([
        pos(innerWidth / 2, innerHeight),
        scale(proportion),
        "background"
    ]);


    onUpdate("background", (b) => {
        if (b.pos.y >= (terrainLength * (-1)) * proportion) {
            b.pos.y = (terrainLength * (-1)) * proportion;

            playerSound.paused = true;
            go("endScreen", { score: player.greetingsCaught });
        }

        accelerate(b);
    });

    addBackground();

    /*-----------------------------------------------
        DEBUG MODE HERE
    ------------------------------------------------*/
    if(debugOn){
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
        COMMANDS GO HERE
    ------------------------------------------------*/
    onTouchStart(() => {
        isMousePressed = true;
        playerSounds()
    });

    onTouchEnd(() => {
        isMousePressed = false
    });

    onMousePress(() => {
        isMousePressed = true;
        playerSounds()
    });

    onMouseRelease(() => {
        isMousePressed = false;
        acceleration = 0; // makes the acceleration more rensponsive
    });

    onKeyPress("space", () => {
        isMousePressed = true;
        playerSounds()
    });

    onKeyRelease("space", () => {
        isMousePressed = false;
    });

    function playerSounds() {
        play('woosh2');
        play('sonnette-velo', {
            volume: 0.3
        });
    }
});