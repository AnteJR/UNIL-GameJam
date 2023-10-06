onTouchStart(() => {
    isMousePressed = true;
    console.log(isMousePressed);
    jaugeIn.height
});

onTouchEnd(() => {
    isMousePressed = false
    console.log("Touch end");
});

onMousePress(() => {
    isMousePressed = true;
    console.log("Mouse down");
});

onMouseRelease(() => {
    isMousePressed = false;
    console.log("Mouse up");
});