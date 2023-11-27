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
    const sheepCollideSound = [
        'sheep-bleat-hit-1',
        'sheep-bleat-hit-2',
        'sheep-bleat-hit-3',
    ];
    onCollide("player", "obstacle", (p) => {
        // ADDA A COLLISION EFFECT
        shake(20);
        play(pickFromArray(sheepCollideSound), { volume: 0.7 });
        player.isDazed = true;
        player.dazeTimer += dazeDurationSeconds;
        if(speed >= dazeSpeed) speed = dazeSpeed;
        acceleration = 0;
        p.play("daze");
    });

    onCollide('sprite_char_tel', 'player', (p) => {
        play('people-ouch', { volume: 0.4 });
    });
    onCollide('luge', 'player', (p) => {
        play('wood-hit', { volume: 0.4 });
    });
    onCollide('scientist', 'player', (p) => {
        wait(0.5, () => play('glass-break', { volume: 1.1 }));
    });

    /*--------------------------
        GREETINGS COLLECTION
    --------------------------*/
    const sheepCollectSound = [
        'sheep-bleat-success-1',
        'sheep-bleat-success-2',
        'sheep-bleat-success-3',
    ];
    onCollide("player", "friend", (p, f) => {
        if (player.dazeTimer > 0) {
            // SAD FACE
        } else {
            // HAPPY FACE
            play(pickFromArray(sheepCollectSound), { volume: 0.6 });
            displayHappyFace();
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
        if (!isGameOver) player.moveTo(0, localWindowTop + (innerHeight * 0.8) / proportion);

        // the dazeTimer decreases over time, and is clamped at 0
        if (player.dazeTimer > 0.18) {
            player.dazeTimer -= dt();
        } else if (player.isDazed) {
            player.play("up");
            player.isDazed = false;
            player.dazeTimer = 0;
        }
    });
}

function displayHappyFace() {
    const happyBadge = add([
        pos(innerWidth, innerHeight/2 - 100),
        rect(106, 106),
        z(100),
        outline(6),
        'happySheep',
    ]);

    happyBadge.add([
        sprite("happy_sheep"),
        pos(3,3),
        scale(.1953),
        z(101),
    ]);

    onUpdate("happySheep", (obj) => {
        obj.outline.color = hsl2rgb(wave(0.4, 0.55, time() * 10), 0.9, 0.5)
    })

    tween(happyBadge.pos.x, happyBadge.pos.x - 104 - 10, 0.5, (p) => happyBadge.pos.x = p, easings.easeOutBounce);

    wait(1.5, () => {
        tween(happyBadge.pos.x, happyBadge.pos.x + 104 + 10, 0.5, (p) => happyBadge.pos.x = p, easings.easeInQuad);
        wait(0.5, () => happyBadge.destroy());
    });
}