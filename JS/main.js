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
    minFriendSpeed = 0.25,
    deadZones = [];

// Nombre de lettres à récupérer
const numFriends = 10,
    // Nombre de porteurs de courier qui ne bougent pas au début
    numEasyFriends = 3;

/*----------------------------
    ÉLÉMENTS DU JEU
----------------------------*/
let background,
    player,
    jaugeOut,
    jaugeIn,
    fiendlySheep,
    letterbox;

/*----------------------------
    DEBUG
----------------------------*/
let friendsPlaced = 0,
    obstaclesPlaced = 0,
    debugOn = false;