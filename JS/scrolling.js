let speed = 10;
let acceleration = 0;
const accelerationRate = 1;
const decelerationRate = 2;
const minSpeed = 5;
const maxSpeed = 20;
let isMousePressed = false;

loadSprite("terrain", "/assets/terrain.png");

const background = add([
    sprite("terrain"),  // renders as a sprite
    pos(innerWidth / 2, innerHeight),    // position in world
    anchor("bot") // Set the anchor of the sprite on its bottom center
]);