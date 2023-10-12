

function randomObstacle(speed = 1, minWait = 0, randomWait = 0) {
    // obstacle that speeds up and slows down randomly

    const side = Math.sign(Math.random() - 0.5);
    const perlinOffset = Math.random() * 8;
    let moveAfterMs = minWait + Math.floor(Math.random() * randomWait);
    const isStartOffset = Math.random() - 0.8 > 0;
    let isMoving = false;


    return {

        id: "randomObstacle",
        require: ["pos"],

        add() {
            // Make the sprite look in the direction of movement
            this.flipX = side > 0;
            // Set the original position, to the left or to the right of the road
            let offset = 40;
            if (isStartOffset) {
                offset *= Math.random();
                isMoving = true;
            }

            this.pos.x = side * Math.random() * 40;

            if (!isStartOffset) {
                setTimeout(() => isMoving = true, moveAfterMs);
            }
        },

        update() {
            if (isMoving) {
                this.pos.x -= side * (0.5 + perlin.get(time() * 4, perlinOffset) / 2) * speed;
            }
        }
    }
}

function oneWayObstacle(speed = 0.5, minWait = 0, randomWait = 0) {
    // obstacle that moves only in one direction
    const side = Math.sign(Math.random() - 0.5);
    let moveAfterMs = minWait + Math.floor(Math.random() * randomWait);
    let isMoving = false;
    const isStartOffset = Math.random() - 0.7 > 0;

    return {

        id: "oneWayObstacle",
        require: ["pos"],

        add() {
            // Make the sprite look in the direction of movement
            this.flipX = side > 0;
            // Set the original position, to the left or to the right of the road
            let offset = 40;
            if (isStartOffset) {
                offset *= Math.random();
                isMoving = true;
            }

            this.pos.x = side * offset;

            if (!isStartOffset) {
                setTimeout(() => isMoving = true, moveAfterMs)
            }
        },

        update() {
            if (isMoving) {
                this.pos.x -= side * speed;
            }
        }
    }
}

function friend() {
    // moves from right to left

    const speed = 0.65 - Math.random() * 0.35;

    return {

        id: "friend_behavior",
        require: ["pos"],

        add() {
            this.pos.x = -50;
        },

        update() {
            this.pos.x += speed;
        }
    }
}
