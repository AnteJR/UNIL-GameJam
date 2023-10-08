

function randomObstacle(speed = 1, minWait = 1000, randomWait = 1500) {
    // obstacle that speeds up and slows down randomly

    const side = Math.sign(Math.random() - 0.5);
    const offset = Math.random() * 8;
    let moveAfterMs = minWait + Math.floor(Math.random() * randomWait);
    let _moving = false;
    let _t = 0;

    return {

        id: "randomObstacle",
        require: ["pos", "area"],

        add() {
            // Make the sprite look in the direction of movement
            this.flipX = side > 0;
            // Set the original position, to the left or to the right of the road
            this.pos.x = side * 40;
            setTimeout(() => _moving = true, moveAfterMs)
        },

        update() {
            if (_moving) {
                this.pos.x -= side * (0.5 + perlin.get(time()*4, offset)/2) * speed;
            }
        }
    }
}

function oneWayObstacle(speed = 0.5, minWait = 500, randomWait = 1500) {
    // obstacle that moves only in one direction
    const side = Math.sign(Math.random() - 0.5);
    let moveAfterMs = minWait + Math.floor(Math.random() * randomWait);
    let _moving = false

    return {

        id: "oneWayObstacle",
        require: ["pos", "area"],

        add() {
            // Make the sprite look in the direction of movement
            this.flipX = side > 0;
            // Set the original position, to the left or to the right of the road
            this.pos.x = side * 40;
            setTimeout(() => _moving = true, moveAfterMs)
        },

        update() {
            if (_moving) {
                this.pos.x -= side * speed;
            }
        }
    }
}

function friend() {
    // obstacle that moves only in one direction

    const minWait = 1500;
    const randomWait = 2500;
    let speed = 0.5;
    let moveAfterMs = minWait + Math.floor(Math.random() * randomWait);
    let _moving = false;

    return {

        id: "friend",
        require: ["pos", "area"],

        add() {
            this.pos.x = 40;
            setTimeout(() => _moving = true, moveAfterMs)
        },

        update() {
            if (_moving) {
                this.pos.x -= speed;
            }
        }
    }
}
