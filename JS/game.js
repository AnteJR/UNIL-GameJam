scene("game", (playerSound) => {
    /*-----------------------------------------------
        PLAYER CHARACTER AND INTERACTIONS HERE
    ------------------------------------------------*/
    player = add([
        sprite("player"),
        outline(1),
        pos(innerWidth/2, innerHeight * 0.8),
        area({
            offset: vec2(0,-2),
            shape: new Rect(vec2(0),4,7)
        }),
        anchor("center"),
        scale(proportion),
        z(5)
    ]);
    
    player.play("up");
    
    player.onCollide(() => {
        console.log("Collision !!!");
    });

    /*-----------------------------------------------
        BACKGROUND HERE
    ------------------------------------------------*/
    background = add([
        pos(innerWidth / 2, innerHeight),    // position in world
        scale(proportion),
        "background"
    ]);
    
    
    onUpdate("background", (b) => {
        if (b.pos.y >= (405 * listGroundAsset.length) * proportion) {
            b.pos.y = (405 * listGroundAsset.length) * proportion;
            return;
        }
    
        accelerate(b);
    });

    addGround();
    addBackground();
    
    /*-----------------------------------------------
        ENTITIES SPAWN HERE
    ------------------------------------------------*/
    setEntities();

    /*-----------------------------------------------
        SPEED-O-METER HERE
    ------------------------------------------------*/
    speedOMeter();
    
    /*-----------------------------------------------
        WIN CONDITIONS HERE
    ------------------------------------------------*/
    // if something happens
    // go("endScreen");

    /*-----------------------------------------------
        COMMANDS GO HERE
    ------------------------------------------------*/
    onTouchStart(() => {
        isMousePressed = true;
        playerSounds()
        //console.log(isMousePressed);
        //jaugeIn.height
    });
    
    onTouchEnd(() => {
        isMousePressed = false
        //console.log("Touch end");
    });
    
    onMousePress(() => {
        isMousePressed = true;
        playerSounds()
        //console.log("Mouse down");
    });
    
    onMouseRelease(() => {
        isMousePressed = false;
        //console.log("Mouse up");
        acceleration = 0; // makes the acceleration more rensponsive
    });
    
    onKeyPress("space", () => {
        isMousePressed = true;
        playerSounds()
    });
    
    onKeyRelease("space", () => {
        isMousePressed = false;
    });
    
    function playerSounds(){
        play('woosh2');
        play('sonnette-velo', {
            volume: 0.3
        });
    }
});