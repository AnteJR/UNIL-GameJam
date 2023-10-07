let acceleration = 0;
const accelerationRate = 0.005 * proportion;
const decelerationRate = -0.01 * proportion;
const maxAccRate = 0.133 * proportion;
const maxDecRate = -0.01667 * proportion;
const minSpeed = 0.5 * proportion;
const maxSpeed = 2.5 * proportion;
let speed = 0;


// add all ground sprites from the list on the background parent
function addGround() {
    console.log(listGroundAsset)
    for (let i = 0; i < listGroundAsset.length; i++) {
        const groundPart = background.add([
            sprite(listGroundAsset[i]),  // renders as a sprite
            pos(0, i * (-135 * 3)),    // position in world
            anchor("bot"), // Set the anchor of the sprite on its bottom center
        
        ]);
        console.log(groundPart)
    }
}

// add all backgrounds (buildings) sprites from the list to the background parent
function addBackground() {
    for (let i = 0; i < listAsset.length; i++) {
        const bgPart = background.add([
            sprite(listAsset[i]),  // renders as a sprite
            pos(0, i * -135 * 3),    // position in world
            anchor("bot"), // Set the anchor of the sprite on its bottom center
            z(100)
        ]);
    }
}

const background = add([
    pos(innerWidth / 2, innerHeight),    // position in world
    scale(proportion),
    "background"
]);


onUpdate("background", (b) => {
    if (b.pos.y >= (405 * listGroundAsset.length) * proportion) {
        b.pos.y = (405 * listGroundAsset.length) * proportion;
        return;
    }

    accelerate(b)
});

function accelerate(b) {
    // on mouse press player accelerate
    if (isMousePressed) {
        acceleration += accelerationRate;
        if (acceleration > maxAccRate) {
            acceleration = maxAccRate
        }
        shake(2)
    // automatically slows down
    } else {
        acceleration += decelerationRate;
        if (acceleration < maxDecRate) {
            acceleration = maxDecRate;
        }
    }

    // Vary acceleration
    speed = speed + acceleration;

    // Clamp speed
    if (speed > maxSpeed) {
        speed = maxSpeed;
    } else if (speed < minSpeed) {
        speed = minSpeed;
    }

    // Apply speed to screen scrolling
    b.pos.y += speed * 60 * dt();
}

addGround()
addBackground()
