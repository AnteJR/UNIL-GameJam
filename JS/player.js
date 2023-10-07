const player = add([
    sprite("player"),
    outline(1),
    pos(innerWidth/2, innerHeight * 0.8),
    area(),
    anchor("center"),
    scale(proportion),
    z(5)
]);

player.play("up");

player.onCollide(() => {
    console.log("Collision !!!");
});

let playerSound;

onClick(() => {
    //FIXME: This should be played when starting the game
    if (!playerSound) playerSound = play('bike-roll-snow', {
        loop: true,
        volume: 0.5,
    });
    play('woosh2');
    play('sonnette-velo', {
        volume: 0.3
    });
})
