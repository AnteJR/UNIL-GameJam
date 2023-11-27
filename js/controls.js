import { firstPress } from './game.js';
import { getLang, proportion } from './main.js';
import { addTxtMenu, texte } from './text-manager.js';

export {
    init,
    checkDeviceType
}

/*---------------------------------------------
    AFFICHER L'EXPLICATION DES CONTRÔLES
---------------------------------------------*/
function init() {
    let isPhone = checkDeviceType();

    // afficher le bon icone (téléphone ou souris)
    const gameControls = add([
        sprite(isPhone ? "phone_control" : "mouse_control", { anim: "tutorial" }),
        pos(Math.floor(width() / 2), Math.floor(height() / 2)),
        anchor("center"),
        scale(proportion - 1),
        opacity(0),
        "controls"
    ]);
    
    // afficher un texte explicatif selon la langue choisie
    const controlTxt = addTxtMenu(texte[getLang()].control + ".", [Math.floor(width() / 2), Math.floor(height() / 50 * 5)], "pixel", "center", 5, "top", 5)
    controlTxt.use(color(0, 0, 0));
    controlTxt.opacity = 0;

    // faire apparaître, puis disparaître le texte au premier input
    onUpdate("controls", (e) => {
        if (firstPress) {
            destroy(e);
            controlTxt.destroy();
        }
        if (e.opacity < 0.8) e.opacity += dt();
        if (controlTxt.opacity < 0.8) controlTxt.opacity += dt();
    });
}

/*------------------------------------
    CHECK SI C'EST SUR MOBILE
------------------------------------*/
function checkDeviceType() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}