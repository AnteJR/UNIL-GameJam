// MAIN FILE - IMPORTING KABOOM, FILES, AND CONST
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let LANG = "ENG";

let scale_incomplete = innerWidth/135;
const proportion = Math.floor(scale_incomplete) + 1;
console.log(proportion)

kaboom({
    width: innerWidth,
    height: innerHeight,
    clearColor: [0, 0, 0]
});