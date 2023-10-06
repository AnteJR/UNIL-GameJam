

const enemy = add([
    rect(40, 40),
    outline(4),
    pos(innerWidth/2, 100),
    area(),
    anchor("center"),
    obstacle()
]);

function obstacle() {

	// Can use local closed variables to store component state
    let speed = 1;
    let margin = 100;

	return {

		// ------------------
		// Special properties that controls the behavior of the component (all optional)

		// The name of the component
		id: "obstacle",
		// If this component depend on any other components
		require: [ "pos", "area"],

		// Runs when the host object is added to the game
		add() {
			// E.g. Register some events from other components, do some bookkeeping, etc.
		},

		// Runs every frame as long as the host object exists
		update() {
            let x = wave(margin, innerWidth-margin, time() * speed)
            this.moveTo(x, this.pos.y);
		},

		// Runs every frame (after update) as long as the host object exists
		draw() {
			// E.g. Custom drawXXX() operations.
		},

		// Runs when the host object is destroyed
		destroy() {
			// E.g. Clean up event handlers, etc.
		},

		// Get the info to present in inspect mode
		inspect() {
		},

		// ------------------
		// All other properties and methods are directly assigned to the host object

        onCollision() {
            console.log("collision !!");
        }
	}

}