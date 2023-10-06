let localWindowTop;
let localWindowBottom;

let bottomMarker = add([
    rect(innerWidth, 1),
    area(),
    pos(innerWidth/2, innerHeight + 200),
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
    localWindowBottom = localWindowTop - innerHeight;
});

const spawnInterval = setInterval(() => {
    let e = background.add([
        rect(16, 16),
        outline(1),
        pos(0, localWindowTop - 40),
        area(),
        anchor("center"),
        oneWayObstacle(),
        "obstacle"
    ]);
}, 2000);
