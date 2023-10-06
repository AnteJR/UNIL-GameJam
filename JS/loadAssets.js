// liste des assets
// const liste_images = ["player"];
// liste_images.forEach(a =>{
//     loadSprite(a,`../assets/${a}.png`);
// })

// const liste_sons = ["son"];
// liste_sons.forEach(a =>{
//     loadSound(a,`../assets/${a}.mp3`);
// })

// ajout des animations
loadSprite("player", "../assets/player.png", {
	sliceX: 4,
	anims: {
		"run": {
			from: 0,
			to: 3,
			speed: 10,
			loop: true,
		},
	},
})