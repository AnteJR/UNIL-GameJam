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