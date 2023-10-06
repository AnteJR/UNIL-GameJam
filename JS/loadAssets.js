// load Player
loadSprite("player", "../assets/player.png", {
	// The image contains 9 frames layed out horizontally, slice it into individual frames
	sliceX: 4,
	// Define animations
	anims: {
		"run": {
			from: 0,
			to: 3,
			speed: 10,
			loop: true,
		},
	},
})