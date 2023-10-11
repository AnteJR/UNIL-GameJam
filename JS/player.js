function setPlayer() {
    player = background.add([
        sprite("player", { anim: "idle" }),
        pos(0, -50),
        area({
            offset: vec2(0, -2),
            shape: new Rect(vec2(0), 4, 7)
        }),
        anchor("center"),
        z(80),
        { dazeTimer: 0 },
        { greetingsCaught: 0 },
        { isDazed: false },
        "player",
        "sheepy"
    ]);

    /*--------------------------
        OBSTACLE COLLIDING
    --------------------------*/
    onCollide("player", "obstacle", (p) => {
        // ADDA A COLLISION EFFECT
        shake(30);
        player.isDazed = true;
        player.dazeTimer += dazeDurationSeconds;
        speed = dazeSpeed;
        acceleration = 0;
        p.play("daze");
    });

    /*--------------------------
        GREETINGS COLLECTION
    --------------------------*/
    onCollide("player", "friend", (p, f) => {
        if (player.dazeTimer > 0) {
            // SAD FACE
        } else {
            // HAPPY FACE
            play("sheep_bleat");
            player.greetingsCaught += 1;
            f.use(sprite('friend_no_letter', { anim: "delivered" }));
        }
    });

    /*--------------------------
        MOVEMENTS AND TIMER
    --------------------------*/
    player.onUpdate(() => {
        // Move the player each frame so that it stays at the same
        // spot on the screen, while being rendered below decor and above ground.
        player.moveTo(0, localWindowTop + (innerHeight * 0.8) / proportion);

        // the dazeTimer decreases over time, and is clamped at 0
        if (player.dazeTimer > 0) {
            player.dazeTimer -= dt();
        } else if (player.isDazed) {
            player.play("up");
            player.isDazed = false;
            player.dazeTimer = 0;
        }
    });
}