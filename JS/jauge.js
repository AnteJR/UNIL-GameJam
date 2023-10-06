const jauge_out = add([
    rect(5,50),
    color(rgb(0, 0, 0)),
    pos(Math.floor(innerWidth/25*24),Math.floor(innerHeight/20)),
    scale(proportion),
    anchor("top")
]);

const jauge_in = add([
    rect(3,50),
    color(rgb(255, 0, 0)),
    pos(Math.floor(innerWidth/25*24),Math.floor(innerHeight/20)+(jauge_out.height*proportion)),
    scale(proportion),
    anchor("bot"),
    "jauge-in"
]);

onUpdate("jauge-in", (e) => {
    e.height = speed
});



console.log(jauge_out.width);