function regularObstacle() {
    // obstacle that oscillates

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

    let speed = 1;
    let margin = 200 / proportion;
    let offset = Math.random() * 5
    let _moving = true
    let _stopInterval = null;
    let _t = 0;

    return {

        id: "randomObstacle",
        require: ["pos", "area"],

        add() {
            _stopInterval = setInterval(() => {
                if (Math.abs(this.pos.x) > 20) {
                    _moving = Math.random() < 0.5 ? !_moving : _moving;
                }
            }, 1000);
        },

        update() {
            if (_moving) {
                let x = wave(margin / proportion, (innerWidth - margin) / proportion, (_t + offset) * speed)
                this.moveTo(x - (innerWidth / 2) / proportion, this.pos.y);
                _t += dt();
            }
        },

        destroy() {
            clearInterval(_stopInterval);
        }
    }
}

function oneWayObstacle() {
    // obstacle that moves only in one direction

    const minWait = 1500;
    const randomWait = 2500;
    const side = Math.sign(Math.random() - 0.5);
    let speed = 0.5;
    let moveAfterMs = minWait + Math.floor(Math.random() * randomWait);
    let _moving = false

    return {

        id: "oneWayObstacle",
        require: ["pos", "area", "sprite"],

        add() {
            //this.flipX = side > 0;
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