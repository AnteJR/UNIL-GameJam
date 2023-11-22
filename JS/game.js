scene("game", () => {
    /*-----------------------
        VARIABLES
    -----------------------*/
    firstPress = false;
    isMousePressed = false;
    speed = 0;
    acceleration = 0;
    friendsPlaced = 0;
    obstaclesPlaced = 0;
    isGameOver = false;

    let isLetterBox = false;

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
        stay(['endScreen']),
        "background"
    ]);

    onUpdate("background", (b) => {
        if (isGameOver) return;
        if (b.pos.y >= -terrainLength * proportion) {
            b.pos.y = -terrainLength * proportion;

            isGameOver = true;
            playerSound.volume = 0;
            play('bike-breaking', { volume: 0.8 });
            wait(1, () => play('sheep-cheers', { volume: 0.8 }));
            player.play("idle");
            // jaugeIn.destroy();
            // jaugeOut.destroy();

            if(!isLetterBox) {
                isLetterBox = true;
                letterbox = add([
                    sprite("letterboxUI", { anim: "static"} ),
                    pos(innerWidth / 10 * 6, innerHeight / 50 * 47),
                    anchor("botleft"),
                    scale(proportion-1),
                    area(),
                    "letterbox"
                ]);
                wait(2, () => playAnimationEnoughTimes(player.greetingsCaught));
            }

            // FIXME: wait(7, () => play('music-1', { volume: 0.6 }));

            wait(8, () => {
                const sky = add([
                    sprite('fin_sky', { anim: 'normal'}),
                    pos(0, -156 * proportion),
                    scale(proportion),
                    stay(['endScreen']),
                    'sky'
                ]);

                const skyInitialY = sky.pos.y;
                const bgInitialY = b.pos.y;
                const letterboyInitialY = letterbox.pos.y;

                // Slide down the whole scene
                tween(
                    0,
                    156 * proportion,
                    6,
                    (val) => {
                        sky.pos.y = skyInitialY + val;
                        b.pos.y = bgInitialY + val;
                        letterbox.pos.y = letterboyInitialY + val;
                    },
                    easings['easeInOutSine'],
                );

                wait(6, () => {
                    sky.play('shooting_star', {
                        onEnd: () => setTimeout(showEndScreen, 0)
                        // FIX: Won't play normal sky anim if called from here 
                    });
                });

                function showEndScreen () {
                    sky.play('normal');
                    wait(1, () => {
                        go("endScreen", { score: player.greetingsCaught });
                    });
                }
            })
        } else {
            accelerate(b);
        }
    });

    addBackground();

    /*-----------------------------------------------
        DEBUG MODE HERE
    ------------------------------------------------*/
    if (debugOn) launchDebug();

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
    // speedOMeter();

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

function playAnimationEnoughTimes(x) {
    if(x <= 0) {
        letterbox.play("static");
        return;
    }
    
    x--;
    letterbox.play("score");
    play('point-up');

    wait(0.5, () => {
        playAnimationEnoughTimes(x);
    });
}