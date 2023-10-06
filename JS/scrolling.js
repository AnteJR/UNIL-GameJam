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

background.onUpdate(() => {
    if (background.pos.y >= background.height) {
        background.pos.y = background.height;
        console.log("On est au bout !");
        return;
    }
    if (isMousePressed) {
        acceleration += accelerationRate;
    } else {
        acceleration -= decelerationRate;
        if (acceleration < 0) {
            acceleration = 0;
        }
    }
    speed = speed + acceleration;

    if (speed > maxSpeed) {
        speed = maxSpeed;
    } else if (speed < minSpeed) {
        speed = minSpeed;
    }

    let movement = vec2(0, speed);
    // .move() is provided by pos()
    background.move(movement);
});

onTouchStart(() => {
    isMousePressed = true;
    console.log("Touch start");
});

onTouchEnd(() => {
    isMousePressed = false
    console.log("Touch end");
});

onMousePress(() => {
    isMousePressed = true;
    console.log("Mouse down");
});

onMouseRelease(() => {
    isMousePressed = false;
    console.log("Mouse up");
});