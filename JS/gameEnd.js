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