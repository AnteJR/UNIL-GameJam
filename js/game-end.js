import { getLang, proportion } from './main.js';
import { addTxtMenu, texte } from './text-manager.js';

export { init };

function init() {
    scene("endScreen", ({ score }) => {
        let replayBtn, continueBtn, creditsBtn;
        
        /*-------------------------------
            TEXTES ÉCRAN FINAL
        -------------------------------*/
        const line1 = addTxtMenu(texte[getLang()].final, [Math.floor(width() / 2), 94], "pixelOutlined", "center", 9, "top", 9);
        const line2 = addTxtMenu(texte[getLang()].finalSmall, [Math.floor(width() / 2), 40 + line1.pos.y + line1.height], "pixelOutlined", "center", 6, "top", 6);
    

        let scaleFactor = proportion < 4 ? proportion : proportion - 1;
        if (width() < 350 || height() < 600) scaleFactor = 2;

        continueBtn = add([
            sprite('start_btn_2', { anim: "default" }),
            anchor("center"),
            pos(Math.floor(width() / 2), Math.floor(height() / 50 * 42)),
            scale(scaleFactor),
            area(),
            "continue"
        ]);

        // Transition to second page
        onClick("continue", (e) => {
            e.play("clicked");

            wait(0.25, () => {
                line2.destroy();
                continueBtn.destroy();
        
                wait(1, () => {
                    addTxtMenu(texte[getLang()].scoring + score + texte[getLang()].objectif, [Math.floor(width() / 2), 40 + line1.pos.y + line1.height], "pixelOutlined", "center", 6, "top", 6);
                    if (score == 10) {
                        addConfetti({ pos: vec2(Math.floor(width() / 2), Math.floor(height() / 50 * 48)) });
                        wait(0.6, () => addConfetti({ pos: vec2(Math.floor(width() / 2), Math.floor(height() / 50 * 48)) }));
                        wait(0.9, () => addConfetti({ pos: vec2(Math.floor(width() / 2), Math.floor(height() / 50 * 48)) }));
                    }
                });

                wait(2, () => {
                    /*-------------------------------
                        BOUTONS ÉCRAN FINAL
                    -------------------------------*/
                    replayBtn = add([
                        sprite(`replay_${getLang()}`, { anim: "default" }),
                        anchor("center"),
                        pos(Math.floor(width() / 2), Math.floor(height() / 50 * 33)),
                        scale(scaleFactor),
                        area(),
                        "replay",
                    ]);

                    creditsBtn = add([
                        sprite('credits', { anim: "default" }),
                        anchor("center"),
                        pos(Math.floor(width() / 2), Math.floor(height() / 50 * 42)),
                        scale(scaleFactor),
                        area(),
                        "credits",
                    ]);

                    /*-------------------------------
                        ONCLICK ET ONTOUCH
                    -------------------------------*/
                    onClick("replay", (e) => replay(e));
                    onClick("credits", () => goToCredits());
                    onTouchStart((i) => {
                        if (replayBtn.hasPoint(i)) replay(replayBtn);
                        if (creditsBtn.hasPoint(i)) goToCredits();
                    });

                });
            });
            
    
            //returnToWebPageTimer = wait(10, () => window.open('https://unil.ch/voeux', '_self'));
        });
    
        
    });
}

/*-------------------------------
    BUTTONS' INTERACTIONS
-------------------------------*/
function replay(e) {
    e.play("clicked");
    setTimeout(() => {
        go("game");
    }, 250);
}

function goToCredits() {
    setTimeout(() => {
        window.open('https://unil.ch/voeux/sheep-it.html', '_self');
    }, 250);
}

/*-------------------------------
    CONFETTIS
-------------------------------*/

const DEF_COUNT = 80;
const DEF_GRAVITY = 800;
const DEF_AIR_DRAG = 0.9;
const DEF_VELOCITY = [1000, 4000];
const DEF_ANGULAR_VELOCITY = [-200, 200];
const DEF_FADE = 0.3;
const DEF_SPREAD = 60;
const DEF_SPIN = [2, 8];
const DEF_SATURATION = 0.8;
const DEF_LIGHTNESS = 0.6;

function addConfetti(opt = {}) {
	const sample = (s) => typeof s === "function" ? s() : s;
	for (let i = 0; i < (opt.count || DEF_COUNT); i++) {
        const size = rand(3, 10);
		const p = add([
			pos(sample(opt.pos || vec2(0, 0))),
			rect(size, size),
			color(sample(opt.color || hsl2rgb(rand(0, 1), DEF_SATURATION, DEF_LIGHTNESS))),
			opacity(1),
			lifespan(4),
			scale(1),
			anchor("center"),
			rotate(rand(0, 360)),
		]);
		const spin = rand(DEF_SPIN[0], DEF_SPIN[1]);
		const gravity = opt.gravity || DEF_GRAVITY;
		const airDrag = opt.airDrag || DEF_AIR_DRAG;
		const heading = sample(opt.heading || 0) - 90;
		const spread = opt.spread || DEF_SPREAD;
		const head = heading + rand(-spread / 2, spread / 2);
		const fade = opt.fade || DEF_FADE;
		const vel = sample(opt.velocity || rand(DEF_VELOCITY[0], DEF_VELOCITY[1]));
		let velX = Math.cos(deg2rad(head)) * vel;
		let velY = Math.sin(deg2rad(head)) * vel;
		const velA = sample(opt.angularVelocity || rand(DEF_ANGULAR_VELOCITY[0], DEF_ANGULAR_VELOCITY[1]));
		p.onUpdate(() => {
			velY += gravity * dt();
			p.pos.x += velX * dt();
			p.pos.y += velY * dt();
			p.angle += velA * dt();
			p.opacity -= fade * dt();
			velX *= airDrag;
			velY *= airDrag;
			p.scale.x = wave(-1, 1, time() * spin);
		});
	}
}
