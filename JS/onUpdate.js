onUpdate("background", (b) => {
    if (b.pos.y >= b.height*proportion) {
        b.pos.y = b.height*proportion;
        return;
    }
    if (isMousePressed) {
        acceleration += accelerationRate;
        if(acceleration > 0.4){
            acceleration = 0.4
        }
    } else {
        acceleration += decelerationRate;
        if (acceleration < -0.05) {
            acceleration = -0.05;
        }
    }
    console.log(acceleration)
    speed = speed + acceleration;

    if (speed > maxSpeed) {
        speed = maxSpeed;
    } else if (speed < minSpeed) {
        speed = minSpeed;
    }

    b.pos.y += speed;

    /*let movement = vec2(0, speed);
    // .move() is provided by pos()
    b.move(movement);*/
});

onUpdate("jaugeIn", (e) => {
    e.height = mapc(speed,minSpeed, maxSpeed, 5, 49)
    //console.log("v", v)
})