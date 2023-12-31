import { friend, oneWayObstacle, randomObstacle } from './entities.js';
import { background } from './game.js';
import { proportion } from './main.js';
import { deadZones, length as terrainLength } from './terrain.js';

export { init, reset, localWindowTop };

// Variables
let localWindowTop = 0;
let currentScrollPosition = 0;
let friendsPlaced = 0;

// Nombre de lettres à récupérer
const numFriends = 10;
// Nombre de porteurs de courier qui ne bougent pas au début
const numEasyFriends = 3;

function init() {

    const terrainStart = background.children[0].pos.y; // Should be 0
    // used to make the obstacles spawn just out of the screen: number of
    // pixels above the top of the screen
    const spawnMargin = 20;

    // Obstacles
    const minDistanceBetweenObstacles = -60;
    const maxDistanceBetweenObstacles = -120;
    // see https://kaboomjs.com/#easings and https://easings.net/
    const difficultyCurve = easings.easeInOutQuad;

    let distanceToNextObstacle = maxDistanceBetweenObstacles;
    // Set the first obstacle just above the top of the screen
    let nextObstaclePosition = -height() / proportion - 40;

    // Friends
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
            speed: 0.4,
            weight: () => map(localWindowTop,
                terrainStart, terrainLength,
                4, 2),
            offset: vec2(0, 5),
            shape: new Rect(vec2(0), 8, 5)
        },
        { // Fast obstacle
            pattern: oneWayObstacle,
            sprite: "luge",
            speed: 0.9,
            weight: () => map(localWindowTop,
                terrainStart, terrainLength,
                1, 5),
            offset: vec2(0, 5),
            shape: new Rect(vec2(0), 10, 5)
        },
        { // Random obstacle
            pattern: randomObstacle,
            sprite: "scientist",
            speed: 0.7,
            weight: () => map(localWindowTop,
                terrainStart, terrainLength,
                0.1, 3),
            offset: vec2(0, 5),
            shape: new Rect(vec2(0), 10, 5)
        }
    ];

    /*-----------------------------------------------
        DESTROY OBSTACLES
    ------------------------------------------------*/

    // We use a marker to catch obstacles that leave the screen from the bottom
    add([
        rect(width(), 1),
        area(),
        pos(width() / 2, height() + 200),
        anchor("center"),
        "bottomMarker"
    ]);

    onCollide("bottomMarker", "entity", (_, theEntity) => {
        destroy(theEntity);
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
        // If we are supposed to place a friend within a margin defined by the
        // two conditions above, and we're also supposed to place an obstacle
        // close to that position
        if (isAfterStartOfSafeZone && isBeforeEndOfSafeZone) {
            // push the next obstacle further
            nextObstaclePosition = -nextFriendPosition - friendSafeZoneEnd;
            return;
        }

        if (spawnPosition <= -nextFriendPosition) {
            const currentDeadZone = getDeadZoneAtPosition(spawnPosition);
            // if we're in a dead zone
            if (currentDeadZone) {
                // Don't care about right-sided deadzones, since friends always
                // go left to right
                if (currentDeadZone.side != "right") {
                    // push the next friend to after the deadzone
                    //const randomDistance = Math.floor(100 + Math.random() * spawnMargin);
                    nextFriendPosition = currentDeadZone.end;
                    return;
                }
            }

            let isEasy = friendsPlaced < numEasyFriends;

            background.add([
                sprite("friend", { anim: "bring" }),
                pos(0, spawnPosition - spawnMargin),
                area({
                    offset: vec2(-4, 0),
                    shape: new Rect(vec2(0), 14, 12)
                }),
                anchor("center"),
                lifespan(15),
                friend(isEasy),
                z(60),
                "friend",
                "entity"
            ]);

            friendsPlaced += 1;

            // hard set of the next position, to avoid a position that has been
            // pushed back by a deadzone from delaying the whole stack of
            // friends. Here we guarantee that there will be numFriends friends
            // on the track.
            nextFriendPosition = -distanceBetweenFriends * (friendsPlaced + 1);
            return;
        }

        // Spawn obstacles
        if (spawnPosition <= nextObstaclePosition) {
            // Select the type of obstacle to spawn
            const selectedObstacle = weightedRandom(weightedObstacleTypes);
            let side = Math.sign(Math.random() - 0.5);

            const currentDeadZone = getDeadZoneAtPosition(spawnPosition);

            if (currentDeadZone) {
                if (currentDeadZone.side == "both") {
                    //const randomDistance = Math.floor(Math.random() * distanceToNextObstacle + spawnMargin);
                    nextObstaclePosition = currentDeadZone.end;
                    return;
                }
                // otherwise just switch sides
                // side=-1 --->
                if (currentDeadZone.side == "right") side = -1;
                // side=1  <---
                if (currentDeadZone.side == "left") side = 1;
            }

            // Configure and spawn the obstacle
            background.add([
                sprite(selectedObstacle.sprite, { anim: "walk" }),
                pos(0, spawnPosition - spawnMargin),
                area({
                    offset: selectedObstacle.offset,
                    shape: selectedObstacle.shape
                }),
                anchor("center"),
                lifespan(8), // destroy après 8 sec
                z(50),
                selectedObstacle.pattern(
                    selectedObstacle.speed,
                    side
                ),
                "obstacle",
                "entity",
                selectedObstacle.sprite, // For finding out which obstacle it is and playing the right sound
            ]);

            nextObstaclePosition = getNextObstaclePosition();
        }
    });

    function getNextObstaclePosition() {
        //let randomDistance = Math.floor(Math.random() * 200 - 100);
        let nextPosition = nextObstaclePosition + distanceToNextObstacle;

        // Here we use an easing function to have a non linear progression
        // while having a min and max distance between obstacles. The easing
        // function can be defined at the top.
        distanceToNextObstacle = mapc(difficultyCurve(localWindowTop / terrainLength) * terrainLength,
            terrainStart, terrainLength,
            maxDistanceBetweenObstacles, minDistanceBetweenObstacles);
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
    for (let zone of deadZones) {
        if (position < zone.end) continue;
        //if (Math.abs(position) > Math.abs(zone.start) && Math.abs(position) < Math.abs(zone.end)) {
        if (position < zone.start && position > zone.end) {
            return zone;
        }
    }
    return null;
}

function reset() {
    localWindowTop = 0;
    currentScrollPosition = 0;
    friendsPlaced = 0;
}