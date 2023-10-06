
const player = add([
    rect(16, 16),
    outline(1),
    pos(innerWidth/2, innerHeight - 100),
    area(),
    anchor("center"),
    scale(proportion)
]);

player.onCollide(() => {
    console.log("Collision !!!");
})