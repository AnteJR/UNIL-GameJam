onUpdate("background", (b) => {
    if (b.pos.y >= b.height) {
        b.pos.y = b.height;
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
    b.move(movement);
});

onUpdate("jaugeIn", (e) => {
    e.height = speed
})