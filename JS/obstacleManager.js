function setEntities() {
    let localWindowTop;

    const terrainStart = background.children[0].pos.y; // Should be 0
    const terrainEnd = backgroundSize * listAsset.length;
    // used to make the obstacles spawn just out of the screen
    const spawnMargin = 40;
    const distanceMultiplier = 0.9;
    let distanceToNextObstacle = -180;
    // Set the first obstacle just above the top of the screen
    let nextObstaclePosition = -innerHeight / proportion - 20;

    console.log(distanceToNextObstacle);


    const weightedMovementPatterns = [
        //{ value: regularObstacle, weight: 3 },
        //{ value: randomObstacle, weight: 2 },
        { value: oneWayObstacle, weight: 1 },
        //{ value: friend, weight: 1 },
    ];

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
        const currentScrollPosition = background.pos.y
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

        // Don't spawn obstacles after the end of the terrain
        if (localWindowTop < terrainEnd) return;

        // Spawn obstacles
        if (localWindowTop - spawnMargin < nextObstaclePosition) {
            //console.log("Spawn" + nextObstaclePosition, distanceToNextObstacle);
            background.add([
                sprite("sprite_char_tel"),
                outline(1),
                pos(0, nextObstaclePosition),
                area(),
                anchor("center"),
                oneWayObstacle(),
                "obstacle"
            ]).play("walk");

            nextObstaclePosition += distanceToNextObstacle;
            distanceToNextObstacle *= distanceMultiplier;
        }
    });
}

function weightedRandom(items) {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const randomValue = Math.random() * totalWeight;

    let cumulativeWeight = 0;

    for (const item of items) {
        cumulativeWeight += item.weight;
        if (randomValue <= cumulativeWeight) {
            return item;
        }
    }

    // This should not happen unless all weights are zero.
    return null;
}
