import { localWindowTop } from './entities-manager.js';
import { gameOver, firstPress, background, mousePressed } from './game.js';
import { proportion } from './main.js';

export {
    init,
    accelerate,
    speed,
    setAcceleration,
    reset,
    player as obj,
    sound,
};

let speed = 0;
let acceleration = 0;
let dazeDurationSeconds = 1;

let accelerationRate;
let decelerationRate;
let maxAccRate;
let maxDecRate;
let minSpeed;
let maxSpeed;
let dazeSpeed;

let player;
let sound;

function init() {
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

    onCollide('sprite_char_tel', 'player', () => {
        play('people-ouch', { volume: 0.4 });
    });
    onCollide('luge', 'player', () => {
        play('wood-hit', { volume: 0.4 });
    });
    onCollide('scientist', 'player', () => {
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
        if (!gameOver) player.moveTo(0, localWindowTop + (height() * 0.8) / proportion);

        // the dazeTimer decreases over time, and is clamped at 0
        if (player.dazeTimer > 0.18) {
            player.dazeTimer -= dt();
        } else if (player.isDazed) {
            player.play("up");
            player.isDazed = false;
            player.dazeTimer = 0;
        }
    });

    /*--------------------------
        ACCELERATION
    --------------------------*/
    accelerationRate = 0.015 * proportion;
    decelerationRate = -0.025 * proportion;
    maxAccRate = 0.15 * proportion;
    maxDecRate = -0.07 * proportion;
    minSpeed = 0.35 * proportion;
    maxSpeed = 2 * proportion;
    dazeSpeed = 0.75 * proportion;


    /*--------------------------
        SOUND
    --------------------------*/
	sound = play('bike-roll-snow', {
		loop: true,
		volume: 0,
	});
}

function accelerate(b) {
    // FIXME: acceleration should not be dependent on frame iterations
    //        Done this way, acceleration is dependent on frame rate.
    //        → It should be calculated with dt().
    if (mousePressed) {
        // on mouse press player accelerate
        acceleration += accelerationRate;
        if (acceleration > maxAccRate) {
            acceleration = maxAccRate;
        }
        //shake(mapc(acceleration, maxDecRate, maxAccRate, 0, 0.1));
    } else {
        // automatically slows down
        acceleration += decelerationRate;
        if (acceleration < maxDecRate) {
            acceleration = maxDecRate;
        }
    }

    if (firstPress && player.dazeTimer == 0) {
        // Vary speed
        speed = speed + acceleration;
        // Clamp speed
        if (speed > maxSpeed) {
            speed = maxSpeed;
        } else if (speed < minSpeed) {
            speed = minSpeed;
        }
    }

    // Apply speed to screen scrolling
    b.pos.y += speed * 60 * dt(); // use dt for framerate invariant speed !
}

function setAcceleration(a) {
    acceleration = a;
}

function pickFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function reset() {
    speed = 0;
    acceleration = 0;
}

function displayHappyFace() {
    const side = 1; // Only from right

    const happyBadge = add([
        pos(width()/2 + (width()/2 * side), height()/2 - 100),
        //rect(134, 134),
        z(100),
        //outline(6),
        rotate(10 * side),
        anchor('center'),
        'happySheep',
    ]);

    happyBadge.add([
        sprite(choose(['ui_sheepy_glass']), { anim: 'idle' }),
        scale(2.8444),
        anchor('center'),
        z(101),
    ]);

    onUpdate("happySheep", (obj) => {
        //obj.outline.color = hsl2rgb(wave(0.4, 0.55, time() * 10), 0.9, 0.5)
    })

    tween(happyBadge.pos.x, happyBadge.pos.x - 60 * side, 0.5, (p) => happyBadge.pos.x = p, easings.easeOutBounce);
    tween(happyBadge.angle, happyBadge.angle - 20 * side, 0.5, (p) => happyBadge.angle = p, easings.easeOutBounce);

    wait(1.5, () => {
        tween(happyBadge.pos.x, happyBadge.pos.x + 120 * side, 0.5, (p) => happyBadge.pos.x = p, easings.easeInQuad);
        wait(0.5, () => happyBadge.destroy());
    });
}