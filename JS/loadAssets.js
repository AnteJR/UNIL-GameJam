// chargement global des sons
const liste_sons = ["bike-roll-snow"];
liste_sons.forEach(a =>{
    loadSound(a,`../assets/${a}.wav`);
})

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
});