export {
    start,
    setLevel
};

let musicTrack;

function start() {
    play('intro-icta', { volume: 0.6 }).onEnd(() => {
        musicTrack.play();
    });
    musicTrack = play('its-christmas-time-again', {
        paused: true,
        loop: true,
        volume: 1
    });
}

function setLevel(level) {
    musicTrack.volume = level;
}
