import { proportion } from './main.js';
import * as music from './music.js';

export { init };

function init() {
    scene("startScreen", () => {
        add([
            sprite("mainBG", { anim: "homeScreen" }),
            scale(proportion),
            pos(width() / 2, height()),
            anchor("bot"),
            color(20, 100, 200)
        ]);
    
        /*-------------------------------
            BOUTONS ÉCRAN ACCUEIL
        -------------------------------*/
        const startBtn = add([
            sprite("start_btn", { anim: "default" }),
            anchor("center"),
            pos(Math.floor(width() / 2), Math.floor(height() / 2)),
            scale(proportion < 4 ? proportion : proportion -1),
            area(),
            "startButton"
        ]);
    
        /*-------------------------------
            ONCLICK ET ONTOUCH
        -------------------------------*/
        onClick("startButton", (e) => start(e));
        onTouchStart((i) => {
            if (startBtn.hasPoint(i)) start(startBtn);
        });
    });
}

/*-------------------------------
    GAME LAUNCH
-------------------------------*/
function start(e) {
    e.play("clicked")

    setTimeout(() => {
        go("homeScreen");
        music.start();
    }, 250);
}
