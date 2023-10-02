

function Tier(name) {

    let gewicht = 0;  // private - nicht von aussen zugreifbar

    function priv() {
        console.log(`${name} läuft privat`);
    }

    function laufen() {  // public - wird zurückgegeben
        priv();
        console.log(`${name} läuft`);
    }

    function set(g) {
        gewicht = g;
    }

    function get() {
        return gewicht;
    }

    function gibtLaut() {
        console.log("die Basis gibt keinen Laut");
    }

    return { laufen, set, get, gibtLaut };
}

function Hund(name) {
    let base = Tier(name);
    base.set(5);

    return {
        laufen: base.laufen, gibtLaut: () => {
            base.gibtLaut();
            console.log("Wau");
        }
    };
}

export function test(a = 14) {
    let h = Hund("Waldi");
    h.laufen();
    h.gibtLaut();
}

