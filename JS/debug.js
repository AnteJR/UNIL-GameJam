function launchDebug() {
    const tempsTotal = add([
        text("TOTAL TIME : 0", {
            transform: () => ({
                color: rgb(255, 0, 0)
            }),
        }),
        pos(24, 24),
    ]);

    tempsTotal.onUpdate(() => {
        tempsTotal.text = `TOTAL TIME ${time()}`;
    });

    const numObstacles = add([
        text("OBSTACLES : 0", {
            transform: () => ({
                color: rgb(255, 0, 0)
            }),
        }),
        pos(24, 54),
    ]);

    numObstacles.onUpdate(() => {
        numObstacles.text = `OBSTACLES ${obstaclesPlaced}`;
    });

    const numFriends = add([
        text("FRIENDS : 0", {
            transform: () => ({
                color: rgb(255, 0, 0)
            }),
        }),
        pos(24, 84),
    ]);

    numFriends.onUpdate(() => {
        numFriends.text = `FRIENDS ${friendsPlaced}`;
    });

}