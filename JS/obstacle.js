
function obstacle() {
    // Can use local closed variables to store component state
    let speed = 1;
    let margin = 100;
    const offset = Math.random() * 5

    return {

        // The name of the component
        id: "obstacle",
        // If this component depend on any other components
        require: ["pos", "area"],

        // Runs every frame as long as the host object exists
        update() {
            let x = wave(margin / proportion, (innerWidth - margin) / proportion, (time() + offset) * speed)
            this.moveTo(x - (innerWidth / 2) / proportion, this.pos.y);
            if (this.pos.y < localWindowBottom) {
                console.log("obstacle destroyed");
                this.destroy();
            }
        }
    }
}