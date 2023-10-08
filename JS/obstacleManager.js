let localWindowTop;
let currentScrollPosition;

function setEntities() {

    const terrainStart = background.children[0].pos.y; // Should be 0
    const terrainEnd = backgroundSize * listAsset.length;
    // used to make the obstacles spawn just out of the screen
    const spawnMargin = 40;
    const distanceMultiplier = 0.95;
    let distanceToNextObstacle = -100;
    // Set the first obstacle just above the top of the screen
    let nextObstaclePosition = -innerHeight / proportion - 40;


    const weightedObstacleTypes = [
        { // Slow obstacle
            pattern: oneWayObstacle,
            sprite: "sprite_char_tel",
            speed:0.5,
            minWait: 0,
            randomWait: 1000,
            weight: () => map(currentScrollPosition/terrainEnd, terrainStart, terrainEnd, 4, 1)
        },
        { // Fast obstacle
            pattern: oneWayObstacle,
            sprite: "luge",
            speed:1,
            minWait: 500,
            randomWait: 1500,
            weight: () => map(currentScrollPosition/terrainEnd, terrainStart, terrainEnd, 2, 3)
        },
        { // Random obstacle
            pattern: randomObstacle,
            sprite: "sprite_char_tel",
            speed: 1,
            minWait: 0,
            randomWait: 1500,
            weight: () => map(currentScrollPosition/terrainEnd, terrainStart, terrainEnd, 1, 3)
        }
    ];

    /*-----------------------------------------------
        DESTROY OBSTACLES
    ------------------------------------------------*/

    // We use a marker to catch obstacles that leave the screen from the bottom
    let bottomMarker = add([
        rect(innerWidth, 1),
        area(),
        pos(innerWidth / 2, innerHeight + 200),
        anchor("center"),
        "bottomMarker"
    ]);

    onCollide("bottomMarker", "obstacle", (_, theObstacle) => {
        destroy(theObstacle);
    });

    onUpdate(() => {
        /* Compute the top of the screen in local coordinates */
        currentScrollPosition = background.pos.y
        localWindowTop = -currentScrollPosition / proportion;

        // Second try at entity placement: position based spawn (as opposed to
        // time based spawn)

        // TODO: Place friendlies

        // let t = background.add([
        //     sprite("friend"),
        //     outline(1),
        //     pos(0, localWindowTop - 80),
        //     area(),
        //     anchor("center"),
        //     friend(),
        //     "friend"
        // ]);

        // t.play("bring")

        const spawnPosition = localWindowTop - spawnMargin;

        // Don't spawn obstacles after the end of the terrain
        if (spawnPosition < terrainEnd) return;

        // Spawn obstacles
        if (spawnPosition < nextObstaclePosition) {
            const currentDeadZone = getDeadZoneAtPosition(spawnPosition);

            // if we're in a dead zone
            if (currentDeadZone) {
                // push the next obstacle to after the deadzone
                const randomDistance = Math.floor(Math.random() * distanceToNextObstacle + spawnMargin);
                nextObstaclePosition = currentDeadZone.end - randomDistance;
                return;
            }

            // Select the type of obstacle to spawn
            const selectedObstacle = weightedRandom(weightedObstacleTypes);

            // Configure and spawn the obstacle
            background.add([
                sprite(selectedObstacle.sprite),
                outline(1),
                pos(0, nextObstaclePosition),
                area(),
                anchor("center"),
                z(50),
                selectedObstacle.pattern(
                    selectedObstacle.speed,
                    selectedObstacle.minWait,
                    selectedObstacle.randomWait),
                "obstacle"
            ]).play("walk");

            nextObstaclePosition += distanceToNextObstacle;
            distanceToNextObstacle *= distanceMultiplier;
        }
    });
}

function weightedRandom(items) {
    const totalWeight = items.reduce((sum, item) => sum + item.weight(), 0);
    const randomValue = Math.random() * totalWeight;

    let cumulativeWeight = 0;

    for (const item of items) {
        cumulativeWeight += item.weight();
        if (randomValue <= cumulativeWeight) {
            return item;
        }
    }

    // This should not happen unless all weights are zero.
    return null;
}

function getDeadZoneAtPosition(position) {
    for (zone of deadZones) {
        if (position < zone.end) continue;
        //if (Math.abs(position) > Math.abs(zone.start) && Math.abs(position) < Math.abs(zone.end)) {
        if (position < zone.start && position > zone.end) {
            return zone;
        }
    }
    return null;
}
