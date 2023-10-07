const texte = {
    FR: {
        final: "Joyeuses Fêtes !",
        finalSmall: "L'UNIL et sa direction transmets ses meilleures voeux et remercie chaleureusement ",
        entities: {

        }
    },
    ENG: {
        final: "Happy Holidays!",
        finalSmall: "The University of Lausanne and its direction sends their best wishes and extends their gratitudes to ",
        entities: {
            
        }
    }
}

screen("endScreen", ({score}) => {
    let victoryTxt = add([
        text(texte[LANG].final, {
            size: 10 * proportion
        }),
        pos(Math.floor(innerWidth/2), Math.floor(innerHeight/25))
    ]);

    let smallVictoryTxt = add([
        text(texte[LANG].finalSmall, {
            size: 10 * proportion
        }),
        pos(Math.floor(innerWidth/2), Math.floor(innerHeight/25)+victoryTxt.innerHeight)
    ]);
}); 