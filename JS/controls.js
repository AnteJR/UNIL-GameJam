/*---------------------------------------------
    AFFICHER L'EXPLICATION DES CONTRÔLES
---------------------------------------------*/
function addControls() {
    let isPhone = chooseControls();

    // afficher le bon icone (téléphone ou souris)
    const gameControls = add([
        sprite(isPhone ? "phone_control" : "mouse_control", { anim: "tutorial" }),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 2)),
        anchor("center"),
        scale(proportion/2),
        opacity(0),
        { waitTime: 1 },
        "controls"
    ]);

    // afficher un texte explicatif selon la langue choisie
    const controlTxt = add([
        text(texte[LANG].control, {
            font: "pixelFont",
            align: "center",
            size: proportion < 6 ? 8 * proportion : (proportion < 15 ? 6 * proportion : 3 * proportion),
            width: proportion == 8 ? 130 * proportion : 130 * (proportion -1),
        }),
        color(0,0,0),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 50 * 5)),
        anchor("top"),
        opacity(0)
    ]);

    // faire apparaître, puis disparaître le texte au premier input
    onUpdate("controls", (e) => {
        if(firstPress) {
            destroy(e);
            controlTxt.destroy();
        }
        if (e.waitTime > 0.18) e.waitTime -= dt()*60;
        else {
            if (e.opacity < 0.8) e.opacity += dt(); 
            if (controlTxt.opacity < 0.8) controlTxt.opacity += dt();
        }  
    });
}

/*------------------------------------
    CHECK SI C'EST SUR MOBILE
------------------------------------*/
function chooseControls() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}