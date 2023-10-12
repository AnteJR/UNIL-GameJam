/*---------------------------
SONS ET MUSIQUES
---------------------------*/
const liste_sons = ["bike-roll-snow", "woosh2", "sonnette-velo","sheep_bleat","daze_fear"];
liste_sons.forEach(a => {
	loadSound(a, `../assets/sounds/${a}.wav`);
});

const playerSound = play('bike-roll-snow', {
	loop: true,
	volume: 0,
});

/*---------------------------
POLICES D'ÉCRITURE
---------------------------*/
loadFont("pixelFont", "../assets/fonts/RetroGaming.ttf")


/*---------------------------
IMAGES DE FOND
---------------------------*/

// fond durant la scène de jeu
loadSprite("computer_background", "../assets/images/UI/computer_background.png");

/*---------------------------
BATIMENTS/DECORS
---------------------------*/
loadRoot("../assets/images/buildings/");
loadSprite("start", "building_start.png", { sliceX: 4, anims: { "default": { from: 0, to: 3, speed: 5, loop: true, } } });
loadSprite("start_ground", "building_start_ground.png");
loadSprite("anthropole", "building_anthropole.png", { anims: { "default": { from: 0, to: 0 } } });
loadSprite("anthropole_ground", "building_anthropole_ground.png");
loadSprite("vortex", "building_vortex.png", { anims: { "default": { from: 0, to: 0 } } });
loadSprite("vortex_ground", "building_vortex_ground.png");
loadSprite("metro", "building_metro.png", { sliceX: 5, anims: { "default": { from: 0, to: 4, speed: 10, loop: true, } } });
loadSprite("metro_ground", "building_metro_ground.png");
loadSprite("forest", "building_forest.png", { sliceX: 4, anims: { "default": { from: 0, to: 3, speed: 5, loop: true, } } });
loadSprite("forest_ground", "building_forest_ground.png");
loadSprite("river", "building_river.png", { sliceX: 5, anims: { "default": { from: 0, to: 4, speed: 10, loop: true, } } });
loadSprite("river_ground", "building_river_ground.png");
loadSprite("busstop", "building_busstop.png", { sliceX: 2, anims: { "default": { from: 0, to: 1, speed: 1, loop: true, } } });
loadSprite("busstop_ground", "building_busstop_ground.png");
loadSprite("busstop_right", "building_busstop_right.png", { sliceX: 2, anims: { "default": { from: 0, to: 1, speed: 1, loop: true, } } });
loadSprite("busstop_right_ground", "building_busstop_right_ground.png");
loadSprite("playing", "building_playing.png", { sliceX: 2, anims: { "default": { from: 0, to: 1, speed: 1, loop: true, } } });
loadSprite("playing_ground", "building_playing_ground.png");
loadSprite("fbm", "building_FBM.png", { anims: { "default": { from: 0, to: 0 } } });
loadSprite("fbm_ground", "building_FBM_ground.png");
loadSprite("fin", "WIP_building_fin.png", { anims: { "default": { from: 0, to: 0 } } });

// CONSTANTES POUR LES BACKGROUNDS :
// 1. listGroundAsset et listAsset listent le nom des textures des assets
// 2. assetLength liste la taille (en multiple de 135), des assets, afin de les placer correctement.
// 3. terrainLength vaut la somme des valeurs de assetLength * -135, pour avoir la longueur totale du terrain de jeu.
const listGroundAsset = [
	"start_ground", "anthropole_ground", "busstop_ground",
	"vortex_ground", "busstop_right_ground", "forest_ground",
	"river_ground", "metro_ground", "playing_ground",
	"fbm_ground", "anthropole_ground"
];
const listAsset = [
	"start", "anthropole", "busstop",
	"vortex", "busstop_right", "forest",
	"river", "metro", "playing",
	"fbm", "fin"];
const assetLength = [1, 3, 2, 6, 2, 3, 2, 3, 1, 5, 3];
let totalLength = 0;
assetLength.forEach((e) => { totalLength += e }); // 31
const terrainLength = totalLength * - 135;

// Liste des zones où aucune entité ne peut spawner, par asset
const assetDeadZones = {
	// Le nom de l'asset (de la listAsset) qui contient une deadzone
	"vortex": [
		{
			start: -112, // position y du début de la deadzone (y=0 en bas de l'image)
			end: -275 // position y de la fin de la deadzone
		},
		{
			start: -596,
			end: -768
		}
	],
	"busstop": [
		{
			start: -25, // position y du début de la deadzone (y=0 en bas de l'image)
			end: -47 // position y de la fin de la deadzone
		}
	]
}

/*---------------------------
PERSONNAGES
---------------------------*/
loadRoot("../assets/images/characters/");
loadSprite("player", "character_sheepy.png", {
	sliceX: 17,
	anims: {
		"idle": {
			from: 13,
			to: 16,
			speed: 5,
			loop: true,
		},
		"up": {
			from: 0,
			to: 3,
			speed: 10,
			loop: true,
		},
		"daze": {
			from: 4,
			to: 12,
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

loadSprite("luge", "character_luge.png", {
	sliceX: 6,
	anims: {
		"walk": {
			from: 0,
			to: 5,
			speed: 5,
			loop: true,
		},
	},
});

loadSprite("scientist", "character_epr.png", {
	sliceX: 6,
	anims: {
		"walk": {
			from: 0,
			to: 5,
			speed: 5,
			loop: true,
		},
	},
});

loadSprite("friend", "character_friendly_sheep-wletter.png", {
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

loadSprite("friend_no_letter", "character_friendly_sheep-woletter.png", {
	sliceX: 6,
	anims: {
		"delivered": {
			from: 0,
			to: 5,
			speed: 5,
			loop: true,
		},
	},
});

/*---------------------------
UI/BOUTONS
---------------------------*/
loadRoot("../assets/images/UI/");
loadSprite("eng_btn", "UI_lang_ENG.png", {
	sliceX: 3,
	anims: {
		"clicked": {
			from: 0,
			to: 2,
			speed: 10,
			loop: false
		},
		"default": {
			from: 0,
			to: 0
		}
	}
});
loadSprite("fr_btn", "UI_lang_FR.png", {
	sliceX: 3,
	anims: {
		"clicked": {
			from: 0,
			to: 2,
			speed: 10,
			loop: false
		},
		"default": {
			from: 0,
			to: 0
		}
	}
});
loadSprite("home_btn", "UI_home_button.png", {
	sliceX: 3,
	anims: {
		"clicked": {
			from: 0,
			to: 2,
			speed: 10,
			loop: false
		},
		"default": {
			from: 0,
			to: 0
		}
	}
});
loadSprite("replay_btn", "UI_replay_button.png", {
	sliceX: 3,
	anims: {
		"clicked": {
			from: 0,
			to: 2,
			speed: 10,
			loop: false
		},
		"default": {
			from: 0,
			to: 0
		}
	}
});
loadSprite("mouse_control", "UI_control_mouse.png", {
	sliceX: 6,
	anims: {
		"tutorial": {
			from: 0,
			to: 5,
			speed: 10,
			loop: true
		}
	}
});
loadSprite("phone_control", "UI_control_phone.png", {
	sliceX: 6,
	anims: {
		"tutorial": {
			from: 0,
			to: 5,
			speed: 10,
			loop: true
		}
	}
});
loadSprite("mainBG", "computer_background.png");