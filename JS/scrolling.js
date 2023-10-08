const backgroundSize = -135 * 3; // Flo: Is it what this value is ? plz don't use magic numbers, use named constants !
const deadZones = [];

// add all ground sprites from the list on the background parent
function addGround() {
    console.log(listGroundAsset)
    for (let i = 0; i < listGroundAsset.length; i++) {
        const groundPart = background.add([
            sprite(listGroundAsset[i]),  // renders as a sprite
            pos(0, i * backgroundSize),    // position in world
            anchor("bot"), // Set the anchor of the sprite on its bottom center
        ]);
        //console.log(groundPart);
    }
}

// add all backgrounds (buildings) sprites from the list to the background parent
function addBackground() {
    for (let i = 0; i < listAsset.length; i++) {
        const position = i * backgroundSize;
        const bgPart = background.add([
            sprite(listAsset[i]),  // renders as a sprite
            pos(0, position),    // position in world
            anchor("bot"), // Set the anchor of the sprite on its bottom center
            z(100)
        ]);

        registerDeadZone(listAsset[i], position);
    }
}

function accelerate(b) {
    if (isMousePressed) {
        // on mouse press player accelerate
        firstPress = true;
        acceleration += accelerationRate;
        if (acceleration > maxAccRate) {
            acceleration = maxAccRate;
        }
        shake(2);
    } else {
        // automatically slows down
        acceleration += decelerationRate;
        if (acceleration < maxDecRate) {
            acceleration = maxDecRate;
        }
    }

    if (firstPress) {
        // Vary speed
        speed = speed + acceleration;
        // Clamp speed
        if (speed > maxSpeed) {
            speed = maxSpeed;
        } else if (speed < minSpeed) {
            speed = minSpeed;
        }
    }

    // Apply speed to screen scrolling
    b.pos.y += speed * 60 * dt(); // use dt for framerate invariant speed !
}

function registerDeadZone(assetName, backgroundPartPosition) {
    // Register dead zones from the asset to the terrain
    const deadZone = assetDeadZones[assetName];
    if (!deadZone) return;

    for (const zone of deadZone) {
        terrainDeadZone = {
            start: backgroundPartPosition + zone.start,
            end: backgroundPartPosition + zone.end
        }

        deadZones.push(terrainDeadZone);

        //debug: visualize deadzones
        // let zoneHeight = Math.abs(zone.end) - Math.abs(zone.start);
        // background.add([
        //     rect(innerWidth, zoneHeight),
        //     pos(-innerWidth/2, terrainDeadZone.end),
        //     color(255, 0, 0),
        //     z(999)
        // ])
    }
}
