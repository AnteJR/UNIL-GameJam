const player = add([
    sprite("player"),
    outline(1),
    pos(innerWidth/2, innerHeight - 270),
    area(),
    anchor("center"),
    scale(proportion)
]);

player.play("run");

player.onCollide(() => {
    console.log("Collision !!!");
});

let playerSound;

onClick(() => {
    //FIXME: This should be played when starting the game
    if (!playerSound) playerSound = play('bike-roll-snow', {
        loop: true,
    });
})
