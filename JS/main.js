// MAIN FILE - IMPORTING KABOOM, FILES, AND CONST
const innerWidth = window.innerWidth,
    innerHeight = window.innerHeight;

let LANG = "ENG";
let debugOn = true;

let scale_incomplete = innerWidth / 135;
const proportion = Math.floor(scale_incomplete) + 1;

kaboom({
    width: innerWidth,
    height: innerHeight,
    clearColor: [0, 0, 0]
});

// SPEED AND INTERACTIONS
let acceleration = 0,
    speed = 0,
    isMousePressed = false;
    firstPress = false;

const accelerationRate = 0.005 * proportion,
    decelerationRate = -0.01 * proportion,
    maxAccRate = 0.133 * proportion,
    maxDecRate = -0.01667 * proportion,
    minSpeed = 0.5 * proportion,
    maxSpeed = 2.5 * proportion;

const dazeDurationSeconds = 1;

// GAME ELEMENTS
let background,
    player,
    jaugeOut,
    jaugeIn;