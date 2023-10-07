let acceleration = 0;
const accelerationRate = 0.01;
const decelerationRate = -0.02;
const minSpeed = 3;
const maxSpeed = 5.5;
let speed = minSpeed;
let isMousePressed = false;

loadRoot("/assets/images/")
loadSprite("anthropole", "building_anthropole.png");
loadSprite("anthropole_ground", "building_anthropole_ground.png");
loadSprite("vortex", "building_vortex.png");
loadSprite("vortex_ground", "building_vortex_ground.png");
// loadSprite("terrain", "/assets/images/terrain.png");

const background = add([
    //sprite("terrain"),  // renders as a sprite
    pos(innerWidth / 2, innerHeight),    // position in world
    //anchor("bot"), // Set the anchor of the sprite on its bottom center
    scale(proportion),
    //z(0),
    "background"
]);


const partGround = background.add([
    sprite("anthropole_ground"),  // renders as a sprite
    pos(0,0),    // position in world
    anchor("bot"), // Set the anchor of the sprite on its bottom center
    //scale(proportion),

]);

const part = background.add([
    sprite("anthropole"),  // renders as a sprite
    pos(0,0),    // position in world
    anchor("bot"), // Set the anchor of the sprite on its bottom center
    //scale(proportion),
    z(10)
]);

const part2Ground = background.add([
    sprite("vortex_ground"),  // renders as a sprite
    pos(0, -135*3),    // position in world
    anchor("bot"), // Set the anchor of the sprite on its bottom center
    //scale(proportion),

]);

const part2 = background.add([
    sprite("vortex"),  // renders as a sprite
    pos(0, -135*3),    // position in world
    anchor("bot"), // Set the anchor of the sprite on its bottom center
    //scale(proportion),
    z(10)
]);

/*const part3 = background.add([
    sprite("terrain"),  // renders as a sprite
    pos(0, -405*2),    // position in world
    anchor("bot"), // Set the anchor of the sprite on its bottom center
    //scale(proportion),

]);*/

onUpdate("background", (b) => {
    // console.log(b.pos.y, proportion)
    if (b.pos.y >= (405*3)*proportion) {
        b.pos.y = (405*3)*proportion;
        return;
    }
    
    accelerate(b)
    /*let movement = vec2(0, speed);
    // .move() is provided by pos()
    b.move(movement);*/
});



function accelerate(b) {
    if (isMousePressed) {
        acceleration += accelerationRate;
        if(acceleration > 0.4){
            acceleration = 0.4
        }
        shake(2)
    } else {
        acceleration += decelerationRate;
        if (acceleration < -0.05) {
            acceleration = -0.05;
        }
    }
    speed = speed + acceleration;

    if (speed > maxSpeed) {
        speed = maxSpeed;
    } else if (speed < minSpeed) {
        speed = minSpeed;
    }

    b.pos.y += speed;
}
