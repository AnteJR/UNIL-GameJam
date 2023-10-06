function regularObstacle() {
    // obstacle that oscillates
    // Can use local closed variables to store component state
    let speed = 1; // change this to have slow or fast obstacles
    let margin = 200;
    const offset = Math.random() * 5

    return {

        // The name of the component
        id: "regularObstacle",
        // If this component depend on any other components
        require: ["pos", "area"],

        // Runs every frame as long as the host object exists
        update() {
            let x = wave(margin / proportion, (innerWidth - margin) / proportion, (time() + offset) * speed)
            this.moveTo(x - (innerWidth / 2) / proportion, this.pos.y);
        }
    }
}

function randomObstacle() {
    // obstacle that stops and starts randomly

    // Can use local closed variables to store component state
    let speed = 1;
    let margin = 200 / proportion;
    const offset = Math.random() * 5
    let moving = true
    let stopInterval = null;
    let _t = 0;

    return {

        // The name of the component
        id: "randomObstacle",
        // If this component depend on any other components
        require: ["pos", "area"],

        add() {
            stopInterval = setInterval(() => {
                if (Math.abs(this.pos.x) > 20) {
                    moving = Math.random() < 0.5 ? !moving : moving;
                }
            }, 1000);
        },

        // Runs every frame as long as the host object exists
        update() {
            if (moving) {
                let x = wave(margin / proportion, (innerWidth - margin) / proportion, (_t + offset) * speed)
                this.moveTo(x - (innerWidth / 2) / proportion, this.pos.y);
                _t += dt();
            }
        },

        destroy() {
            clearInterval(stopInterval);
        }
    }
}

function oneWayObstacle() {
    // obstacle that moves only in one direction

    // Can use local closed variables to store component state
    const minWait = 1500;
    const randomWait = 2500;
    let speed = 0.5;
    let moving = false
    let moveAfterMs = minWait + Math.floor(Math.random() * randomWait);

    return {

        // The name of the component
        id: "oneWayObstacle",
        // If this component depend on any other components
        require: ["pos", "area"],

        add() {
            this.pos.x = 40;
            setTimeout(() => moving = true, moveAfterMs)
        },

        // Runs every frame as long as the host object exists
        update() {
            if (moving) {
                this.pos.x -= speed;
            }
        }
    }
}