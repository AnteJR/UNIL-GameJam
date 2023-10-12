function addControls() {
    let isPhone = chooseControls();

    const gameControls = add([
        sprite(isPhone ? "phone_control" : "mouse_control", { anim: "tutorial" }),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 2)),
        anchor("center"),
        scale(proportion/2),
        opacity(0.6),
        //{ waitTime: 150 },
        "controls"
    ]);

    const controlTxt = add([
        text(texte[LANG].control, {
            font: "pixelFont",
            align: "center",
            size: proportion < 6 ? 8 * proportion : (proportion < 15 ? 6 * proportion : 3 * proportion),
            width: proportion == 8 ? 130 * proportion : 130 * (proportion -1),
        }),
        color(0,0,0),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 50 * 3)),
        anchor("top")
    ]);

    onUpdate("controls", (e) => {
        if(firstPress) {
            destroy(e);
            controlTxt.destroy();
        }
        if (e.waitTime > 0.18) e.waitTime -= dt()*60;
        else {
            if (e.opacity < 0.8) e.opacity += dt(); 
        }  
    });
}

function chooseControls() {
    if(innerWidth > 767) return false;
    else return true;
}