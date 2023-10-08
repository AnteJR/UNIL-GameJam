// chargement global des sons
const liste_sons = ["bike-roll-snow", "woosh2", "sonnette-velo"];
liste_sons.forEach(a => {
	loadSound(a, `../assets/sounds/${a}.wav`);
});

loadRoot("../assets/images/buildings/");

loadSprite("anthropole", "building_anthropole.png");
loadSprite("anthropole_ground", "building_anthropole_ground.png");
loadSprite("vortex", "building_vortex.png");
loadSprite("vortex_ground", "building_vortex_ground.png");
loadSprite("metro", "building_metro.png", {
	sliceX: 3,
	anims: {
		"default": {
			from: 0,
			to: 2,
			speed: 10,
			loop: true,
		} 
	}
});
loadSprite("metro_ground", "building_metro_ground.png");

loadRoot("../assets/images/");
loadSprite("eng_btn", "UI_lang_ENG.png");
loadSprite("fr_btn", "UI_lang_FR.png");

// Il suffit juste d'ajouter les backgrounds + grounds aux listes
// (dans l'ordre pour que le sol corresponde aux batiments)
// et il faut que la taille des assets soit tout le temps la même sinon il faudra ajuster le code
// il faudra adapter le code
const listGroundAsset = ["anthropole_ground", "vortex_ground", "metro_ground"];
const listAsset = ["anthropole", "vortex", "metro"];

loadRoot("../assets/images/characters/");
// ajout des animations et personnages
loadSprite("player", "character_sheepy.png", {
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

loadSprite("sprite_char_tel", "character_tel.png", {
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
loadSprite("friend", "character_friendly_sheep.png", {
	sliceX: 6,
	anims: {
		"bring": {
			from: 0,
			to: 5,
			speed: 5,
			loop: true,
		},
	},
});