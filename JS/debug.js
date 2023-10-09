function launchDebug(){
    const tempsTotal = add([
        text("TOTAL TIME : 0",{
            transform: () => ({
                color: rgb(255,0,0)
            }),
        }),
        pos(24, 24),
    ])

    tempsTotal.onUpdate(() =>{
        tempsTotal.text = `TOTAL TIME ${time()}`;
    })

}