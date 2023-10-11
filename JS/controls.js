function addControls() {
    let isPhone = chooseControls();

    const gameControls = add([
        sprite(isPhone ? "phone_control" : "mouse_control", { anim: "tutorial" }),
        pos(Math.floor(innerWidth / 2), Math.floor(innerHeight / 2)),
        anchor("center"),
        scale(proportion),
        opacity(0),
        { waitTime: 150 },
        "controls"
    ]);

    onUpdate("controls", (e) => {
        if(firstPress) destroy(e);

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