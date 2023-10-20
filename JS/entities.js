function randomObstacle(speed = 1, side = 1) {
    // obstacle that speeds up and slows down randomly
    const slowSpeed = 0.3 * speed;
    const fastSpeed = 0.6 * speed;
    const toggleChance = 0.0125


    return {

        id: "randomObstacle",
        require: ["pos"],

        add() {
            // Make the sprite look in the direction of movement
            this.flipX = side > 0;
            // Set the original position, to the left or to the right of the road
            let offset = 60;
            this.pos.x = side * Math.random() * offset;
            this.fast = false;
            this.speed = slowSpeed;
        },

        update() {
            this.pos.x -= side * this.speed;

            if (Math.random() < toggleChance) {
                this.toggleSpeed();
            }
        },

        toggleSpeed() {
            this.speed = this.fast ? fastSpeed : slowSpeed;
            this.fast = !this.fast;
        }
    }
}

function oneWayObstacle(speed = 0.5, side = 1) {
    // obstacle that moves only in one direction

    return {

        id: "oneWayObstacle",
        require: ["pos"],

        add() {
            // Make the sprite look in the direction of movement
            this.flipX = side > 0;
            // Set the original position, to the left or to the right of the road
            let offset = 100;

            this.pos.x = side * Math.random() * offset;

        },

        update() {
            this.pos.x -= side * speed;
        }
    }
}

function friend(isEasy) {
    // moves from right to left

    var friendSpeed = 0.6 - Math.random() * 0.4;

    return {

        id: "friend_behavior",
        require: ["pos"],

        add() {
            if (isEasy) return;
            this.pos.x = -60;
        },

        update() {
            if (isEasy) return;
            this.pos.x += friendSpeed;
        }
    }
}
