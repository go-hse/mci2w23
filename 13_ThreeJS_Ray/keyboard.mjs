
function Keyboard() {

    let keys = {};
    // ev: keyboardEvent https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
    // isDown = true: Taste wird gedrückt.
    // 
    function toggle(ev, isDown) {
        // prüft, ob Taste mit Callback belegt
        if (keys[ev.key]) {

            // holt Objekt, das pro Taste gespeichert wird
            const keyobjekt = keys[ev.key];

            // wenn Taste gedrückt und noch kein Callback
            // aufgerufen wurde: rufe Callback
            if (keyobjekt.isDown !== isDown) {
                keyobjekt.callback(isDown);
                keyobjekt.isDown = isDown;
            }
            ev.preventDefault();
            ev.stopPropagation();
        } else {
            console.log(`${ev.key} ist nicht belegt`);
        }
    }

    document.addEventListener("keydown", ev => toggle(ev, true));
    document.addEventListener("keyup", ev => toggle(ev, false));

    return (key, callback) => {
        keys[key] = {
            callback,
            isDown: false
        };
    };
}

export const keyboard = Keyboard();
