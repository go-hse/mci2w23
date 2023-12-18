

export function mousecursor(cursor) {
    let mousebuttons = [false, false, false, false, false];

    const movescale = 0.002;
    // event listener
    function onMouseMove(ev) {
        const dx = ev.movementX * movescale;
        const dy = ev.movementY * movescale;

        const rot = ev.ctrlKey;

        if (!rot && mousebuttons[0]) {
            cursor.position.x += dx;
            cursor.position.y -= dy;
        }

        if (rot && mousebuttons[0]) {
            cursor.rotation.z += dx;
            cursor.rotation.x += dy;
        }


        if (mousebuttons[2]) {
            cursor.position.x += dx;
            cursor.position.z += dy;
        }

        // console.log(mousebuttons);
    }

    function onMouseDown(ev) {
        ev.preventDefault();
        mousebuttons[ev.button] = true;
    }

    function onMouseUp(ev) {
        ev.preventDefault();
        mousebuttons[ev.button] = false;
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("contextmenu", ev => {
        ev.preventDefault();
        ev.stopPropagation();
        return false;
    }, false);


}