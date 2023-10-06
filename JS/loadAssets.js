// chargement global des sons
const liste_sons = ["bike-roll-snow", "woosh2"];
liste_sons.forEach(a =>{
    loadSound(a,`../assets/sounds/${a}.wav`);
})

// ajout des animations et personnages
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

// ajout des animations
loadSprite("sprite_char_tel", "../assets/images/sprite_char_tel.png", {
	sliceX: 7,
	anims: {
		"walk": {
			from: 0,
			to: 6,
			speed: 5,
			loop: true,
		},
	},
});