let acceleration = 0;
const accelerationRate = 0.003 * proportion;
const decelerationRate = -0.007 * proportion;
const minSpeed = 1 * proportion;
const maxSpeed = 2 * proportion;
let speed = minSpeed;
let isMousePressed = false;
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
    pos(0, 0),    // position in world
    anchor("bot"), // Set the anchor of the sprite on its bottom center
    //scale(proportion),

]);

const part = background.add([
    sprite("anthropole"),  // renders as a sprite
    pos(0, 0),    // position in world
    anchor("bot"), // Set the anchor of the sprite on its bottom center
    //scale(proportion),
    z(10)
]);

const part2Ground = background.add([
    sprite("vortex_ground"),  // renders as a sprite
    pos(0, -135 * 3),    // position in world
    anchor("bot"), // Set the anchor of the sprite on its bottom center
    //scale(proportion),

]);

const part2 = background.add([
    sprite("vortex"),  // renders as a sprite
    pos(0, -135 * 3),    // position in world
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
    if (b.pos.y >= (405 * 3) * proportion) {
        b.pos.y = (405 * 3) * proportion;
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
        if (acceleration > 0.133 * proportion) {
            acceleration = 0.133 * proportion
        }
        shake(2)
    } else {
        acceleration += decelerationRate;
        if (acceleration < -0.01667 * proportion) {
            acceleration = -0.01667 * proportion;
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
