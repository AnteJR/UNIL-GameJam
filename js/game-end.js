import { getLang, proportion } from './main.js';
import { addTxtMenu, texte } from './text-manager.js';

export { init };

function init() {
    scene("endScreen", ({ score }) => {
        let replayBtn;
        
        /*-------------------------------
            TEXTES ÉCRAN FINAL
        -------------------------------*/
        const line1 = addTxtMenu(texte[getLang()].final, [Math.floor(width() / 2), 94], "pixelOutlined", "center", 9, "top", 9);
        const line2 = addTxtMenu(texte[getLang()].finalSmall, [Math.floor(width() / 2), 40 + line1.pos.y + line1.height], "pixelOutlined", "center", 6, "top", 6);
    
        // Transition to second page
        wait(10, () => {
            line2.destroy();
    
            addTxtMenu(texte[getLang()].scoring + score + texte[getLang()].objectif, [Math.floor(width() / 2), 40 + line1.pos.y + line1.height], "pixelOutlined", "center", 6, "top", 6);
    
            /*-------------------------------
                BOUTONS ÉCRAN FINAL
            -------------------------------*/
            replayBtn = add([
                sprite(`replay_${getLang()}`, { anim: "default" }),
                anchor("center"),
                pos(Math.floor(width() / 2), Math.floor(height() / 50 * 40)),
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
        onTouchStart((i) => {
            if (replayBtn.hasPoint(i)) replay(replayBtn);
        });
    });
}

/*-------------------------------
    BUTTONS' INTERACTIONS
-------------------------------*/
function replay(e) {
    e.play("clicked")

    //returnToWebPageTimer.cancel();

    setTimeout(() => {
        go("game");
    }, 250);
}