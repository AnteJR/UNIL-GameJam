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

loadSound('bike-roll-snow', '../assets/bike-roll-snow.wav');