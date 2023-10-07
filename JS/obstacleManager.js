let localWindowTop;
//let localWindowBottom;

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
    /* Compute the top and bottom of the screen in local coordinates */
    const currentScrollPosition = background.pos.y

    localWindowTop = -currentScrollPosition / proportion;
    //localWindowBottom = localWindowTop - innerHeight;
});

const spawnInterval = setInterval(() => {
    const selectedMovementPattern = weightedRandom(weightedMovementPatterns).value;

    let e = background.add([
        sprite("sprite_char_tel"),
        outline(1),
        pos(0, localWindowTop - 40),
        area(),
        anchor("center"),
        selectedMovementPattern(),
        "obstacle"
    ]);

    e.play("walk")

    let t = background.add([
        sprite("friend"),
        outline(1),
        pos(0, localWindowTop - 80),
        area(),
        anchor("center"),
        friend(),
        "friend"
    ]);

    t.play("bring")

}, 2000);

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
