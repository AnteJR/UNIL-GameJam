import { background } from './game.js';

export { init, length, deadZones };

// CONSTANTES POUR LES BACKGROUNDS :
// 1. listGroundAsset et listAsset listent le nom des textures des assets
// 2. assetLength liste la taille (en multiple de 135), des assets, afin de les placer correctement.
// 3. terrainLength vaut la somme des valeurs de assetLength * -135, pour avoir la longueur totale du terrain de jeu.
const listGroundAsset = [
    "start_ground",
    "banane_ground",
    "anthropole_ground",
    "beach_ground",
    "busstop_ground",
    "vortex_ground",
    "busstop_right_ground",
    "forest_ground",
    "river_ground",
    "metro_ground",
    "playing_ground",
    "fbm_ground",
    "fin_ground"
];
const listAsset = [
    "start",
    "banane",
    "anthropole",
    "beach",
    "busstop",
    "vortex",
    "busstop_right",
    "forest",
    "river",
    "metro",
    "playing",
    "fbm",
    "fin"
];
const assetLength = [1, 3, 3, 2, 2, 6, 2, 3, 2, 3, 1, 5, 3];
let totalLength = 0;
assetLength.forEach((e) => { totalLength += e; }); // 31
const length = totalLength * - 135;

// Liste des zones où aucune entité ne peut spawner, par asset
const assetDeadZones = {
    // Le nom de l'asset (de la listAsset) qui contient une deadzone
    "vortex": [
        {
            start: -112, // position y du début de la deadzone (y=0 en bas de l'image)
            end: -285, // position y de la fin de la deadzone
            side: "both", // côté de la deadzone
        },
        {
            start: -596,
            end: -775,
            side: "both",
        }
    ],
    "busstop": [
        {
            start: -25,
            end: -47,
            side: "both",
        }
    ],
    "forest": [
        {
            start: -170,
            end: -237,
            side: "both",
        },
        {
            start: -300,
            end: -386,
            side: "both",
        }
    ],
    "fin": [
        {
            start: -150,
            end: -405,
            side: "both",
        }
    ],
    "fbm": [
        {
            start: -74,
            end: -571,
            side: "right",
        }
    ],
    "start": [
        {
            start: 0,
            end: -135,
            side: "both",
        }
    ],
    "banane": [
        {
            start: 0,
            end: -400,
            side: "both",
        }
    ]
};

const deadZones = [];

function init() {
    // add all ground sprites from the list on the background parent
    for (let i = 0; i < listGroundAsset.length; i++) {
        let position = 0;
        if (i > 0) {
            let previousPos = 0;
            for (let j = 0; j < listGroundAsset.length; j++) {
                if (j >= i) break;
                previousPos -= assetLength[j];
            }
            position = previousPos * 135;
        }
        background.add([
            sprite(listGroundAsset[i]),
            pos(0, position),
            anchor("bot"),
            z(0)
        ]);

        background.add([
            sprite(listAsset[i]),
            pos(0, position),
            anchor("bot"),
            z(100)
        ]).play("default");

        registerDeadZone(listAsset[i], position);
    }
}

function registerDeadZone(assetName, backgroundPartPosition) {
    // Register dead zones from the asset to the terrain
    const deadZone = assetDeadZones[assetName];
    if (!deadZone) return;

    for (const zone of deadZone) {
        // Translate the zone coordinates which are relative to parts
        // into coordinates relative to the whole background
        const terrainDeadZone = {
            start: backgroundPartPosition + zone.start,
            end: backgroundPartPosition + zone.end,
            side: zone.side
        };

        deadZones.push(terrainDeadZone);

        // debug: visualize deadzones
        // let zoneHeight = Math.abs(zone.end) - Math.abs(zone.start);
        // let zoneWidth = zone.side == "both" ? width() : (zone.side == "right" || zone.side == "left" ? width() / 2 : null);
        // let posX = zone.side == "both" || zone.side == "left" ? -width()/2 : (zone.side == "right" ? 0 : null);
        // background.add([
        //     rect(zoneWidth, zoneHeight),
        //     pos(posX, terrainDeadZone.end),
        //     color(255, 0, 0, 0.2),
        //     z(999)
        // ]);
    }
}