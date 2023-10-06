const jaugeOut = add([
    rect(5,50),
    color(rgb(0, 0, 0)),
    pos(Math.floor(innerWidth/25*24),Math.floor(innerHeight/20)),
    scale(proportion),
    anchor("top"),
    "jaugeOut"
]);

const jaugeIn = add([
    rect(3,50),
    color(rgb(255, 0, 0)),
    pos(Math.floor(innerWidth/25*24),Math.floor(innerHeight/20)+(jaugeOut.height*proportion)),
    scale(proportion),
    anchor("bot"),
    "jaugeIn"
]);

console.log(jaugeOut.width);