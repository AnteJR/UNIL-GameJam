// chargement global des sons
const liste_sons = ["bike-roll-snow", "woosh2", "sonnette-velo"];
liste_sons.forEach(a => {
	loadSound(a, `../assets/sounds/${a}.wav`);
});

loadRoot("../assets/images/");

loadSprite("anthropole", "building_anthropole.png");
loadSprite("anthropole_ground", "building_anthropole_ground.png");
loadSprite("vortex", "building_vortex.png");
loadSprite("vortex_ground", "building_vortex_ground.png");

// ajout des animations et personnages
loadSprite("player", "sprite_char_velo.png", {
	sliceX: 4,
	anims: {
		"up": {
			from: 0,
			to: 3,
			speed: 10,
			loop: true,
		},
	},
});

loadSprite("sprite_char_tel", "sprite_char_tel.png", {
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

// ajout des animations
loadSprite("friend", "sprite_sheep_lettre.png", {
	sliceX: 4,
	anims: {
		"bring": {
			from: 0,
			to: 3,
			speed: 5,
			loop: true,
		},
	},
});