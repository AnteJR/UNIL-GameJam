function regularObstacle() {
    // Can use local closed variables to store component state
    let speed = 1;
    let margin = 200 / proportion;
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