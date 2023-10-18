/*---------------------
    TEXT CONSTANT
---------------------*/
const texte = {
    FR: {
        final: "Bravo !",
        finalSmall: "L'Université de Lausanne vous souhaite de belles fêtes et une bonne année 2024 !",
        scoring: "Vous avez récupéré ",
        objectif: " voeux de fin d'année !",
        control: "Laissez appuyé pour accélérer et relâchez pour ralentir",
        accueil: "Aidez Sheepy à collecter les cartes de voeux de l'UNIL !"
    },
    ENG: {
        final: "Well done!",
        finalSmall: "The University of Lausanne wishes you a wonderful holiday season and a happy new year!",
        scoring: "You managed to grab ",
        objectif: " holiday greetings cards!",
        control: "Press and hold to accelerate and release to slow down",
        accueil: "Help Sheepy collect UNIL's holiday greetings cards!"
    }
}

/*---------------------------------
    FUNCTION TO OUTLINE TEXTS
---------------------------------*/
function addTxtMenu(textToAdd, position, fontName, alignment, baseSize, anchorage, lineSpace) {
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