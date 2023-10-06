let speed = 50;
let acceleration = 0;

loadSprite("terrain", "/assets/terrain.png");

const background = add([
    sprite("terrain"),  // renders as a sprite
    pos(innerWidth/2, innerHeight),    // position in world
    anchor("bot")
]);

background.onUpdate(() => {
    if (background.pos.y >= background.height) {
        console.log("On est au bout !");
        return;
    }
    let movement = vec2(0, speed);
    // .move() is provided by pos()
    background.move(movement);
});