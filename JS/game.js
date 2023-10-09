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
            return;
        }

        accelerate(b);
    });

    addBackground();

    /*-----------------------------------------------
        PLAYER CHARACTER AND INTERACTIONS HERE
    ------------------------------------------------*/
    player = background.add([
        sprite("player"),
        pos(0, -50),
        area({
            offset: vec2(0, -2),
            shape: new Rect(vec2(0), 4, 7)
        }),
        anchor("center"),
        z(50),
        "player"
    ]);

    let dazeTimer = 0;
    let greetingsCaught = 0;

    player.play("up");

    onCollide("player", "obstacle", () => {
        dazeTimer += dazeDurationSeconds;
    });

    onCollide("player", "friend", () => {
        if (dazeTimer > 0) {
            // SAD FACE
            console.log("Greeting NOT caught !");
        } else {
            // HAPPY FACE
            greetingsCaught += 1;
            console.log("Greeting caught !");
        }
    });

    // Move the player each frame so that it stays at the same
    // spot on the screen, while being rendered below decor and above ground.
    player.onUpdate(() => {
        player.moveTo(0, localWindowTop + (innerHeight * 0.8) / proportion);

        if (dazeTimer > 0) {
            dazeTimer -= dt();
            if (dazeTimer < 0) {
                dazeTimer = 0;
            }
        }
    })

    /*-----------------------------------------------
        ENTITIES SPAWN HERE
    ------------------------------------------------*/
    setEntities();

    /*-----------------------------------------------
        SPEED-O-METER HERE
    ------------------------------------------------*/
    speedOMeter();

    /*-----------------------------------------------
        WIN CONDITIONS HERE
    ------------------------------------------------*/
    // if something happens
    // go("endScreen");

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

    onKeyPress("d", () => {
        debugOn === true ? debugOn = false : debugOn = true;
    })

    function playerSounds() {
        play('woosh2');
        play('sonnette-velo', {
            volume: 0.3
        });
    }
});