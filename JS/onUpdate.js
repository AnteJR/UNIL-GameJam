background.onUpdate(() => {
    if (background.pos.y >= background.height) {
        background.pos.y = background.height;
        console.log("On est au bout !");
        return;
    }
    if (isMousePressed) {
        acceleration += accelerationRate;
    } else {
        acceleration -= decelerationRate;
        if (acceleration < 0) {
            acceleration = 0;
        }
    }
    speed = speed + acceleration;

    if (speed > maxSpeed) {
        speed = maxSpeed;
    } else if (speed < minSpeed) {
        speed = minSpeed;
    }

    let movement = vec2(0, speed);
    // .move() is provided by pos()
    background.move(movement);
});

onUpdate("jauge_in", (e) => {
    e.height = 1 - (speed + 1);
})