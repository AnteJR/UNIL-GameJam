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

// console.log(jaugeOut.width);

onUpdate("jaugeIn", (e) => {
    e.height = mapc(speed,minSpeed, maxSpeed, 5, 49)
    // mise à jour de la vitesse de l'animation selon la vitesse
    player.animSpeed = mapc(speed,minSpeed, maxSpeed, 1, 2);
    // Mise à jour de la vitesse de playback du son selon la vitesse
    if (playerSound) playerSound.speed = mapc(speed, minSpeed, maxSpeed, 1, 1.4);
});