/*--------------------------------------------------------
    IMPORTATION DE KABOOM ET PARAMÉTRAGES DU CANVAS
--------------------------------------------------------*/
const innerWidth = window.innerWidth,
    innerHeight = window.innerHeight;

let LANG = "ENG";
let debugOn = true;

let scale_incomplete = innerWidth / 135;
const proportion = Math.floor(scale_incomplete) >= 7 ? 8 : Math.floor(scale_incomplete) + 1;

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
    isMousePressed = false;
    firstPress = false;

const accelerationRate = 0.005 * proportion,
    decelerationRate = -0.01 * proportion,
    maxAccRate = 0.133 * proportion,
    maxDecRate = -0.025 * proportion,
    minSpeed = 0.5 * proportion,
    maxSpeed = 2 * proportion;
    dazeSpeed = 0.75 * proportion;

const dazeDurationSeconds = 1;

/*----------------------------
    ÉLÉMENTS DU JEU
----------------------------*/
let background,
    player,
    jaugeOut,
    jaugeIn,
    fiendlySheep;

/*--------------
    TEXTES
--------------*/
const texte = {
    FR: {
        final: "Récolte terminée !",
        finalSmall: "L'Université de Lausanne vous souhaite de belles fêtes et une bonne année 2024 !",
        scoring: "Vous avez récupéré ",
        objectif: " voeux de fin d'année !"
    },
    ENG: {
        final: "Gathering completed!",
        finalSmall: "The University of Lausanne wishes you a wonderful holiday season and a happy new year!",
        scoring: "You managed to grab ",
        objectif: " holiday greetings cards!"
    }
}