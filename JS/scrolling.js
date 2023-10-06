let speed = 2;
let acceleration = 0;
const accelerationRate = 0.25;
const decelerationRate = -0.5;
const minSpeed = 0.1;
const maxSpeed = 5;
let isMousePressed = false;

loadSprite("terrain", "/assets/terrain.png");

const background = add([
    sprite("terrain"),  // renders as a sprite
    pos(innerWidth / 2, innerHeight),    // position in world
    anchor("bot"), // Set the anchor of the sprite on its bottom center
    scale(proportion),
    "background"
]);