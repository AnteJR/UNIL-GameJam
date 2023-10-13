/*--------------------------------------------------------
    IMPORTATION DE KABOOM ET PARAMÉTRAGES DU CANVAS
--------------------------------------------------------*/

const MAX_RATIO = 0.7;

let tempWidth = window.innerWidth,
    tempHeight = window.innerHeight;

const deviceRatio = tempWidth / tempHeight;

if (deviceRatio > MAX_RATIO) {
    tempWidth = tempHeight * MAX_RATIO;
}

const innerWidth = tempWidth,
    innerHeight = tempHeight;

let LANG = "ENG";
let debugOn = true;

let scale_incomplete = innerWidth / 135;
const proportion = Math.floor(scale_incomplete) >= 6 ? 7 : Math.floor(scale_incomplete) + 1,
    actualProportion = Math.floor(scale_incomplete) + 1;

kaboom({
    width: innerWidth,
    height: innerHeight,
    clearColor: [0, 0, 0]
});

/*------------------------------------------
    VARIABLES POUR INTERACTIONS
------------------------------------------*/
let acceleration = 0,
    speed = 0,
    isMousePressed = false,
    firstPress = false,
    isGameOver = false;

const accelerationRate = 0.015 * proportion,
    decelerationRate = -0.025 * proportion,
    maxAccRate = 0.15 * proportion,
    maxDecRate = -0.07 * proportion,
    minSpeed = 0.35 * proportion,
    maxSpeed = 2 * proportion,
    dazeSpeed = 0.75 * proportion,
    dazeDurationSeconds = 1,
    deadZones = [];

/*----------------------------
    ÉLÉMENTS DU JEU
----------------------------*/
let background,
    player,
    jaugeOut,
    jaugeIn,
    fiendlySheep;

/*----------------------------
    DEBUG
----------------------------*/
let friendsPlaced = 0,
    obstaclesPlaced = 0;

/*--------------
    TEXTES
--------------*/
const texte = {
    FR: {
        final: "Récolte terminée !",
        finalSmall: "L'Université de Lausanne vous souhaite de belles fêtes et une bonne année 2024 !",
        scoring: "Vous avez récupéré ",
        objectif: " voeux de fin d'année !",
        control: "Laissez appuyé pour accélérer et relâchez pour ralentir"
    },
    ENG: {
        final: "Gathering completed!",
        finalSmall: "The University of Lausanne wishes you a wonderful holiday season and a happy new year!",
        scoring: "You managed to grab ",
        objectif: " holiday greetings cards!",
        control: "Press and hold to accelerate and release to slow down"
    }
}