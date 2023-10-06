// chargement global des sons
const liste_sons = ["bike-roll-snow", "woosh2"];
liste_sons.forEach(a =>{
    loadSound(a,`../assets/sounds/${a}.wav`);
})

// ajout des animations
loadSprite("player", "../assets/images/player.png", {
	sliceX: 4,
	anims: {
		"run": {
			from: 0,
			to: 3,
			speed: 10,
			loop: true,
		},
	},
});