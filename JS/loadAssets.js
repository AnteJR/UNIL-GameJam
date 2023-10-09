// chargement global des sons
const liste_sons = ["bike-roll-snow", "woosh2", "sonnette-velo"];
liste_sons.forEach(a => {
	loadSound(a, `../assets/sounds/${a}.wav`);
});

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

// CONSTANTES POUR LES BACKGROUNDS :
// 1. listGroundAsset et listAsset listent le nom des textures des assets
// 2. assetLength liste la taille (en multiple de 135), des assets, afin de les placer correctement.
// 3. terrainLength vaut la somme des valeurs de assetLength * -135, pour avoir la longueur totale du terrain de jeu.
const listGroundAsset = ["start_ground", "anthropole_ground", "vortex_ground", "metro_ground", "forest_ground"];
const listAsset = ["start", "anthropole", "vortex", "metro", "forest"];
const assetLength = [1, 3, 6, 3, 3];
let totalLength = 0;
assetLength.forEach((e) => { totalLength += e });
const terrainLength = totalLength * -135;

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
	]
}

/*---------------------------
PERSONNAGES
---------------------------*/
loadRoot("../assets/images/characters/");
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

/*---------------------------
UI/BOUTONS
---------------------------*/
loadRoot("../assets/images/");
loadSprite("eng_btn", "UI_lang_ENG.png");
loadSprite("fr_btn", "UI_lang_FR.png");