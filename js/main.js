/* global kaboom */

import * as startScreen from './start-screen.js';
import * as loadAssets from './load-assets.js';
import * as homeScreen from './home-screen.js';
import * as game from './game.js';
import * as gameEnd from './game-end.js';

export {
    setLang,
    getLang,
    proportion,
};

/*--------------------------------------------------------
    IMPORTATION DE KABOOM ET PARAMÉTRAGES DU CANVAS
--------------------------------------------------------*/

const MAX_RATIO = 0.7;
const MAX_WIDTH = 500;

let width = window.innerWidth,
    height = window.innerHeight;

const deviceRatio = width / height;

if (deviceRatio > MAX_RATIO) {
    width = height * MAX_RATIO;
}

// Limiting canvas size
if (width > MAX_WIDTH) {
    width = MAX_WIDTH;
    height = width / Math.min(deviceRatio, MAX_RATIO);
}

let lang = "FR";

let scale_incomplete = width / 135;
const proportion = Math.floor(scale_incomplete) >= 6 ? 7 : Math.floor(scale_incomplete) + 1;

/*----------------------------
    FUNCTIONS
----------------------------*/
function setLang(l) {
    lang = l;
}

function getLang() {
    return lang;
}

/*-------------------------------
    GAME INITIALIZATION
-------------------------------*/
function initKaboom() {
    // Older Safari versions don't support AudioContext.decodeAudioData as a Promise
    // This is a workaround to display an alert message to the user
    // Remove this try catch to see the error in the console, which is:
    // "TypeError: Not enough arguments" in decodeAudioData - kaboom.ts:2277
    try {
        kaboom({
            width: width,
            height: height,
            background: [0, 0, 0],
            clearColor: [0, 0, 0],
            // Limit pixel density to avoid low frame rate on mobile devices
            pixelDensity: Math.min(devicePixelRatio, 2),
            //maxFPS: 5, // To try out frame invariant speeds
        });
    } catch (e) {
        alert("Malheureusement, votre navigateur ne supporte pas ce jeu. Nous en sommes désolés. Veuillez utiliser un navigateur plus récent.");
    }
}    

function initModules() {
    // This is necessary as those modules require kaboom to be initialized (global variables)
    startScreen.init();
    loadAssets.init();
    homeScreen.init();
    game.init();
    gameEnd.init();
}

function initGame() {
    go("startScreen");
}

initKaboom(); // This need to happen before modules initialization
initModules();
initGame();