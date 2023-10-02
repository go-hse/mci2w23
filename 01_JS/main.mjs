import { test, GET_URL } from "./js/prom.mjs";
import * as funktionModul from "./js/funcs.mjs";
funktionModul.test();


let o = {
    key: 12,
    "key;asdf": 12,
}

function onload() {
    console.log("On load", new Date());
    console.log(`das datum ist ${new Date()}`);
    test();

    if (a > 12) {
        let b = a;
        console.log(a, b);
    } // b verschwindet

    console.log(o.key, o["key;asdf"]);

}

window.onload = onload;

