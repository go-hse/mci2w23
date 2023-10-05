import { test, GET_URL } from "./js/prom.mjs";
import * as funktionModul from "./js/funcs.mjs";
funktionModul.test();


function onload() {
}

window.onload = () => {
    let arr = [1, 2, 3, 4, 5];
    console.log(typeof arr, Array.isArray(arr), arr.length);
    arr.push(5);

    console.log(arr.pop(), arr.shift()); // letztes oder erstes Element entfernen


    arr.splice(2, 1); // Element löschen
    console.log(arr);

    const i = 3;
    if (arr.includes(i)) {
        const idx = arr.indexOf(i);
        const del = arr.splice(idx, 1);
        console.log(arr, del);
    }

    for (let i = 0; i < arr.length; ++i) {
        console.log(i, arr[i]);
    }

    for (let v of arr) {
        console.log(v);
    }

    function toMap(v) {
        return v * 2
    };

    arr = arr.map(toMap);
    console.log(arr);


    let objArr = [{ a: "Test", n: 15 }, { a: "Test 2", n: 16 }, { a: "Test 2", n: 20 }]

    // let result = objArr.forEach(v => v.a += " B");
    // console.log(result, objArr);

    let filtered = objArr.filter(v => v.n > 15);
    console.log(filtered, objArr);

    let obj = { Vorname: "Max", Nachname: "Mustermann", Alter: 15 };
    for (let att in obj) {
        console.log(att, obj[att]);
    }



};

