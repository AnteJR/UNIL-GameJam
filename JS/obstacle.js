

const enemy = background.add([
    rect(16, 16),
    outline(1),
    pos(0, -200),
    area(),
    anchor("center"),
    obstacle()
]);

function obstacle() {
	// Can use local closed variables to store component state
    let speed = 1;
    let margin = 100;

	return {

		// The name of the component
		id: "obstacle",
		// If this component depend on any other components
		require: [ "pos", "area"],

		// Runs every frame as long as the host object exists
		update() {
            let x = wave(margin / proportion, (innerWidth-margin) / proportion, time() * speed)
            this.moveTo(x - (innerWidth/2)/proportion, this.pos.y);
		}
	}

}