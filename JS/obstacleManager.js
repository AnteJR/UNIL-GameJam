
obstacles = [];
let localWindowTop;

onUpdate(() => {
    const currentScrollPosition = background.pos.y

    localWindowTop = -currentScrollPosition / proportion;
});

setInterval(() => {
    background.add([
        rect(16, 16),
        outline(1),
        pos(0, localWindowTop),
        area(),
        anchor("center"),
        obstacle()
    ]);
}, 1000);
