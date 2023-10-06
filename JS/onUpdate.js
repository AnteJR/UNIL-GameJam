onUpdate("jaugeIn", (e) => {
    e.height = mapc(speed,minSpeed, maxSpeed, 5, 49)
    // mise à jour de la vitesse de l'animation selon la vitesse
    player.animSpeed = mapc(speed,minSpeed, maxSpeed, 1, 2);
    // Mise à jour de la vitesse de playback du son selon la vitesse
    if (playerSound) playerSound.speed = mapc(speed, minSpeed, maxSpeed, 1, 1.4);
});