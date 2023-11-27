import * as music from './music.js';
import * as player from './player.js';
import * as entitiesManager from './entities-manager.js';
import * as terrain from './terrain.js';
import * as controls from './controls.js';
import { proportion } from './main.js';

export {
    init,
    mousePressed,
    firstPress,
    gameOver,
    background,
};

let mousePressed;
let firstPress;
let gameOver;
let background;
let letterbox;
let timeLastAcceleration = 0;

function init() {
    scene("game", () => {
        /*-----------------------
            VARIABLES
        -----------------------*/
        firstPress = false;
        mousePressed = false;
        gameOver = false;

        /*-----------------------
            RESET
        -----------------------*/
        player.reset();
        entitiesManager.reset();
    
        let isLetterBox = false;
    
        /*-----------------------
            MUSIC AND SOUNDS
        -----------------------*/
        // ADD MUSIC AND SOUNDS HERE (if they need to be triggered on scene load)
    
        /*----------------
            BACKGROUND
        -----------------*/
        background = add([
            pos(width() / 2, height()),
            scale(proportion),
            stay(['endScreen']),
            "background"
        ]);
    
        onUpdate("background", (b) => {
            if (gameOver) return;
            if (b.pos.y >= -terrain.length * proportion) {
                b.pos.y = -terrain.length * proportion;
    
                gameOver = true;
                player.sound.volume = 0;
                play('bike-breaking', { volume: 0.4 });
                wait(1, () => play('sheep-cheers', { volume: 0.6 }));
                player.obj.play("idle");
    
                if(!isLetterBox) {
                    isLetterBox = true;
                    letterbox = add([
                        sprite("letterboxUI", { anim: "static"} ),
                        pos(width() / 10 * 6, height() / 50 * 47),
                        anchor("botleft"),
                        scale(proportion - 1),
                        area(),
                        "letterbox"
                    ]);
                    wait(2, () => playAnimationEnoughTimes(player.obj.greetingsCaught));
                }
    
                wait(8, () => {
                    music.setLevel(1.0);
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
                            go("endScreen", { score: player.obj.greetingsCaught });
                        });
                    }
                })
            } else {
                player.accelerate(b);
            }
        });
    
        terrain.init();
    
        /*-----------------------------------------------
            PLAYER CHARACTER AND INTERACTIONS HERE
        ------------------------------------------------*/
        player.init();
    
        /*-----------------------------------------------
            ENTITIES SPAWN HERE
        ------------------------------------------------*/
        entitiesManager.init();
    
        /*-----------------------------------------------
            CONTROLS GO HERE
        ------------------------------------------------*/
        controls.init();
    
        onTouchStart(actionPressed);
        onTouchEnd(actionReleased);
        onMousePress(actionPressed);
        onMouseRelease(actionReleased);
        onKeyPress("space", actionPressed);
        onKeyRelease("space", actionReleased);
    
        function actionPressed() {
            if (!firstPress) gameStartNow();
            mousePressed = true;
            playerSounds()
        }
    
        function actionReleased() {
            mousePressed = false;
            player.setAcceleration(0.1);
        }
    });
}

function playerSounds() {
    const now = time();
    if (gameOver) {
        play('sonnette-velo', {
            volume: 0.2
        });
    } else {
        if (now - timeLastAcceleration > 2) {
            play('woosh2');
            play('sonnette-velo', {
                volume: 0.2
            });
        }
    }
    timeLastAcceleration = now;
}

function gameStartNow() {
    firstPress = true;
    player.obj.play("up");
    player.sound.volume = 0.5;
    music.setLevel(0.6);
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