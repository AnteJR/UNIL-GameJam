import { getLang, proportion } from './main.js';
import { addTxtMenu, texte } from './text-manager.js';

export { init };

function init() {
    scene("endScreen", ({ score }) => {
        let replayBtn, continueBtn, creditsBtn;
        
        /*-------------------------------
            TEXTES ÉCRAN FINAL
        -------------------------------*/
        const line1 = addTxtMenu(texte[getLang()].final, [Math.floor(width() / 2), 94], "pixelOutlined", "center", 9, "top", 9);
        const line2 = addTxtMenu(texte[getLang()].finalSmall, [Math.floor(width() / 2), 40 + line1.pos.y + line1.height], "pixelOutlined", "center", 6, "top", 6);
    

        let scaleFactor = proportion < 4 ? proportion : proportion - 1;
        if (width() < 350) scaleFactor = 2;

        continueBtn = add([
            sprite('start_btn_2', { anim: "default" }),
            anchor("center"),
            pos(Math.floor(width() / 2), Math.floor(height() / 50 * 42)),
            scale(scaleFactor),
            area(),
            "continue"
        ]);

        // Transition to second page
        onClick("continue", (e) => {
            e.play("clicked");

            wait(0.25, () => {
                line2.destroy();
                continueBtn.destroy();
        
                wait(1, () => addTxtMenu(texte[getLang()].scoring + score + texte[getLang()].objectif, [Math.floor(width() / 2), 40 + line1.pos.y + line1.height], "pixelOutlined", "center", 6, "top", 6));
        
                wait(2, () => {
                    /*-------------------------------
                        BOUTONS ÉCRAN FINAL
                    -------------------------------*/
                    replayBtn = add([
                        sprite(`replay_${getLang()}`, { anim: "default" }),
                        anchor("center"),
                        pos(Math.floor(width() / 2), Math.floor(height() / 50 * 33)),
                        scale(scaleFactor),
                        area(),
                        "replay",
                    ]);

                    creditsBtn = add([
                        sprite('credits', { anim: "default" }),
                        anchor("center"),
                        pos(Math.floor(width() / 2), Math.floor(height() / 50 * 42)),
                        scale(scaleFactor),
                        area(),
                        "credits",
                    ]);

                    /*-------------------------------
                        ONCLICK ET ONTOUCH
                    -------------------------------*/
                    onClick("replay", (e) => replay(e));
                    onClick("credits", () => goToCredits());
                    onTouchStart((i) => {
                        if (replayBtn.hasPoint(i)) replay(replayBtn);
                        if (creditsBtn.hasPoint(i)) goToCredits();
                    });

                });
            });
            
    
            //returnToWebPageTimer = wait(10, () => window.open('https://unil.ch/voeux', '_self'));
        })
    
        
    });
}

/*-------------------------------
    BUTTONS' INTERACTIONS
-------------------------------*/
function replay(e) {
    e.play("clicked")
    setTimeout(() => {
        go("game");
    }, 250);
}

function goToCredits() {
    setTimeout(() => {
        window.open('https://unil.ch/voeux', '_self');
    }, 250);
}