let localWindowTop;
let currentScrollPosition;

function setEntities() {

    const terrainStart = background.children[0].pos.y; // Should be 0
    // used to make the obstacles spawn just out of the screen: number of
    // pixels above the top of the screen
    const spawnMargin = 70;

    // Obstacles
    const minDistanceBetweenObstacles = -100;
    const maxDistanceBetweenObstacles = -250;
    const placementEasingFunction = easings.easeInOutCubic; // see https://easings.net/
    let distanceToNextObstacle = maxDistanceBetweenObstacles;
    // Set the first obstacle just above the top of the screen
    let nextObstaclePosition = -innerHeight / proportion - 40;

    // Friends
    const numFriends = 10;
    const distanceBetweenFriends = terrainLength / (numFriends + 1);
    // Relative distances below and over the friend where no obstacle
    // can spawn
    const friendSafeZoneStart = 20; // number of pixels below the friend
    const friendSafeZoneEnd = 40; // number of pixels above the friend
    let nextFriendPosition = -distanceBetweenFriends;

    const weightedObstacleTypes = [
        { // Slow obstacle
            pattern: oneWayObstacle,
            sprite: "sprite_char_tel",
            speed: 0.6,
            minWait: 0,
            randomWait: 50,
            weight: () => map(currentScrollPosition / proportion,
                                terrainStart, -terrainLength,
                                4, 1)
        },
        { // Fast obstacle
            pattern: oneWayObstacle,
            sprite: "luge",
            speed: 0.9,
            minWait: 500,
            randomWait: 2000,
            weight: () => map(currentScrollPosition / proportion,
                                terrainStart, -terrainLength,
                                2, 3)
        },
        { // Random obstacle
            pattern: randomObstacle,
            sprite: "scientist",
            speed: 0.7,
            minWait: 0,
            randomWait: 70,
            weight: () => map(currentScrollPosition / proportion,
                                terrainStart, -terrainLength,
                                1, 3)
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
        currentScrollPosition = background.pos.y;
        localWindowTop = -currentScrollPosition / proportion;

        // Second try at entity placement: position based spawn (as opposed to
        // time based spawn)
        const spawnPosition = localWindowTop - spawnMargin;

        // Don't spawn obstacles after the end of the terrain
        if (spawnPosition < terrainLength) return;

        const isAfterStartOfSafeZone = nextObstaclePosition < -nextFriendPosition + friendSafeZoneStart;
        const isBeforeEndOfSafeZone = nextObstaclePosition > -nextFriendPosition - friendSafeZoneEnd;
        //if we also were supposed to place an obstacle close to that position
        if (isAfterStartOfSafeZone && isBeforeEndOfSafeZone) {
            // push the next obstacle further
            nextObstaclePosition = -nextFriendPosition - friendSafeZoneEnd;
            return;
        }

        if (spawnPosition < -nextFriendPosition) {
            fiendlySheep = background.add([
                sprite("friend"),
                pos(0, spawnPosition),
                area(),
                anchor("center"),
                friend(),
                "friend"
            ]).play("bring");

            nextFriendPosition -= distanceBetweenFriends;
        }

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

            nextObstaclePosition = getNextObstaclePosition();
        }
    });

    function getNextObstaclePosition() {
        let nextPosition = nextObstaclePosition + distanceToNextObstacle;

        // Here we use an easing function to have a non linear progression
        // while having a min and max distance between obstacles. The easing
        // function can be defined at the top.
        distanceToNextObstacle = map(placementEasingFunction((currentScrollPosition / proportion)/-terrainLength) * -terrainLength,
                                    terrainStart, -terrainLength,
                                    maxDistanceBetweenObstacles, minDistanceBetweenObstacles)

        return nextPosition;
    }
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
