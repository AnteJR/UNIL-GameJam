let acceleration = 0;
const accelerationRate = 0.01;
const decelerationRate = -0.02;
const minSpeed = 3;
const maxSpeed = 5.5;
let speed = minSpeed;
let isMousePressed = false;

loadSprite("terrain", "/assets/terrain.png");

const background = add([
    sprite("terrain"),  // renders as a sprite
    pos(innerWidth / 2, innerHeight),    // position in world
    anchor("bot"), // Set the anchor of the sprite on its bottom center
    scale(proportion),
    "background"
]);