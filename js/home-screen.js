import { setLang, proportion } from './main.js';
import { addTxtMenu, texte } from './text-manager.js';

export { init };

function init() {
    scene("homeScreen", () => {
        add([
            sprite("mainBG", { anim: "homeScreen" }),
            scale(proportion),
            pos(width() / 2, height()),
            anchor("bot")
        ]);
    
        /*-------------------------------
            TEXTES ÉCRAN ACCUEIL
        -------------------------------*/
        let taille = proportion < 4 ? 6 : 5;
        addTxtMenu(texte.FR.accueil, [Math.floor(width() / 2), Math.floor((height() / 5) + (height() / 50))], "pixelOutlined", "center", taille, "top", taille);
        addTxtMenu(texte.ENG.accueil, [Math.floor(width() / 2), Math.floor(((height() / 20) * 11) + (height() / 50))], "pixelOutlined", "center", taille, "top", taille);
            
        /*-------------------------------
            BOUTONS ÉCRAN ACCUEIL
        -------------------------------*/
        let scaleFactor = proportion < 4 ? proportion : proportion - 1;
        if (width() < 350 || height() < 600) scaleFactor = 2;

        const flagFR = add([
            sprite("fr_btn", { anim: "default" }),
            anchor("bot"),
            pos(Math.floor(width() / 2), Math.floor(height() / 5)),
            scale(scaleFactor),
            area(),
            { value: "fr" },
            "french",
            "startButton"
        ]);
    
        const flagENG = add([
            sprite("eng_btn", { anim: "default" }),
            anchor("bot"),
            pos(width() / 2, (height() / 20) * 11),
            scale(scaleFactor),
            area(),
            { value: "eng" },
            "english",
            "startButton"
        ]);
    
        /*-------------------------------
            ONCLICK ET ONTOUCH
        -------------------------------*/
        onClick("startButton", (e) => launch(e));
        onTouchStart((i) => {
            if (flagENG.hasPoint(i)) launch(flagENG);
            else if (flagFR.hasPoint(i)) launch(flagFR);
        });
    });
}

/*-------------------------------
    GAME LAUNCH
-------------------------------*/
function launch(e) {
    setLang(e.value.toUpperCase());

    e.play("clicked");

    setTimeout(() => {
        go("game");
    }, 250);
}