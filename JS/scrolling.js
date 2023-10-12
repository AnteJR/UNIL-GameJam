// add all ground sprites from the list on the background parent
function addBackground() {
    for (let i = 0; i < listGroundAsset.length; i++) {
        let position = 0;
        if (i > 0) {
            let previousPos = 0;
            for (let j = 0; j < listGroundAsset.length; j++) {
                if (j >= i) break;
                previousPos -= assetLength[j];
            }
            position = previousPos * 135
        }
        const groundPart = background.add([
            sprite(listGroundAsset[i]),
            pos(0, position),
            anchor("bot"),
            z(0)
        ]);

        const bgPart = background.add([
            sprite(listAsset[i]),
            pos(0, position),
            anchor("bot"),
            z(100)
        ]).play("default");

        registerDeadZone(listAsset[i], position);
    }
}

function accelerate(b) {
    if (isMousePressed) {
        // on mouse press player accelerate
        acceleration += accelerationRate;
        if (acceleration > maxAccRate) {
            acceleration = maxAccRate;
        }
        shake(1.5);
    } else {
        // automatically slows down
        acceleration += decelerationRate;
        if (acceleration < maxDecRate) {
            acceleration = maxDecRate;
        }
    }

    if (firstPress && player.dazeTimer == 0) {
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
        // Translate the zone coordinates which are relative to parts
        // into coordinates relative to the whole background
        terrainDeadZone = {
            start: backgroundPartPosition + zone.start,
            end: backgroundPartPosition + zone.end,
            side: zone.side
        }

        deadZones.push(terrainDeadZone);

        // debug: visualize deadzones
        /*let zoneHeight = Math.abs(zone.end) - Math.abs(zone.start);
        let zoneWidth = zone.side == "both" ? innerWidth : (zone.side == "right" || zone.side == "left" ? innerWidth / 2 : null);
        let posX = zone.side == "both" || zone.side == "left" ? -innerWidth/2 : (zone.side == "right" ? 0 : null);
        //console.log(zoneWidth);
        background.add([
            rect(zoneWidth, zoneHeight),
            pos(posX, terrainDeadZone.end),
            color(255, 0, 0),
            z(999)
        ]);*/
    }
}
