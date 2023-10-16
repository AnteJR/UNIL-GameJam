/*---------------------
    TEXT CONSTANT
---------------------*/
const texte = {
    FR: {
        final: "Récolte terminée !",
        finalSmall: "L'Université de Lausanne vous souhaite de belles fêtes et une bonne année 2024 !",
        scoring: "Vous avez récupéré ",
        objectif: " voeux de fin d'année !",
        control: "Laissez appuyé pour accélérer et relâchez pour ralentir",
        accueil: "Aidez Sheepy à collecter les cartes de voeux de l'UNIL !"
    },
    ENG: {
        final: "Gathering completed!",
        finalSmall: "The University of Lausanne wishes you a wonderful holiday season and a happy new year!",
        scoring: "You managed to grab ",
        objectif: " holiday greetings cards!",
        control: "Press and hold to accelerate and release to slow down",
        accueil: "Help Sheepy collect UNIL's holiday wishes cards!"
    }
}

/*---------------------------------
    FUNCTION TO OUTLINE TEXTS
---------------------------------*/
function addTxtMenu(textToAdd, position, fontName, alignment, baseSize, anchorage, lineSpace) {
    const mult = proportion < 4 ? 1500 : 2000;
    const txtShadowTopLeft = add([
        text(textToAdd, {
            font: fontName,
            align: alignment,
            size: baseSize * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: lineSpace
        }),
        pos(Math.floor(position[0] - innerWidth / (mult / proportion)), Math.floor(position[1] - innerHeight / (mult / proportion))),
        anchor(anchorage),
        color(0, 0, 0),
        z(0)
    ]);

    const txtShadowMidLeft = add([
        text(textToAdd, {
            font: fontName,
            align: alignment,
            size: baseSize * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: lineSpace
        }),
        pos(Math.floor(position[0] - innerWidth / (mult / proportion)), Math.floor(position[1])),
        anchor(anchorage),
        color(0, 0, 0),
        z(0)
    ]);

    const txtShadowBotLeft = add([
        text(textToAdd, {
            font: fontName,
            align: alignment,
            size: baseSize * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: lineSpace
        }),
        pos(Math.floor(position[0] - innerWidth / (mult / proportion)), Math.floor(position[1] + innerHeight / (mult / proportion))),
        anchor(anchorage),
        color(0, 0, 0),
        z(0)
    ]);

    const txtShadowTop = add([
        text(textToAdd, {
            font: fontName,
            align: alignment,
            size: baseSize * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: lineSpace
        }),
        pos(Math.floor(position[0]), Math.floor(position[1] - innerHeight / (mult / proportion))),
        anchor(anchorage),
        color(0, 0, 0),
        z(0)
    ]);

    const txtShadowBot = add([
        text(textToAdd, {
            font: fontName,
            align: alignment,
            size: baseSize * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: lineSpace
        }),
        pos(Math.floor(position[0]), Math.floor(position[1] + innerHeight / (mult / proportion))),
        anchor(anchorage),
        color(0, 0, 0),
        z(0)
    ]);

    const txtShadowTopRight = add([
        text(textToAdd, {
            font: fontName,
            align: alignment,
            size: baseSize * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: lineSpace
        }),
        pos(Math.floor(position[0] + innerWidth / (mult / proportion)), Math.floor(position[1] - innerHeight / (mult / proportion))),
        anchor(anchorage),
        color(0, 0, 0),
        z(0)
    ]);

    const txtShadowMidRight = add([
        text(textToAdd, {
            font: fontName,
            align: alignment,
            size: baseSize * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: lineSpace
        }),
        pos(Math.floor(position[0] + innerWidth / (mult / proportion)), Math.floor(position[1])),
        anchor(anchorage),
        color(0, 0, 0),
        z(0)
    ]);

    const txtShadowBotRight = add([
        text(textToAdd, {
            font: fontName,
            align: alignment,
            size: baseSize * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: lineSpace
        }),
        pos(Math.floor(position[0] + innerWidth / (mult / proportion)), Math.floor(position[1] + innerHeight / (mult / proportion))),
        anchor(anchorage),
        color(0, 0, 0),
        z(0)
    ]);

    return add([
        text(textToAdd, {
            font: fontName,
            align: alignment,
            size: baseSize * proportion,
            width: 145 * (proportion - 1),
            lineSpacing: lineSpace
        }),
        pos(Math.floor(position[0]), Math.floor(position[1])),
        anchor(anchorage),
        z(10)
    ]);
}