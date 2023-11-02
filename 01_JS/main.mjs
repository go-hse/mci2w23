import { test, GET_URL } from "./js/prom.mjs";
import * as funktionModul from "./js/funcs.mjs";
funktionModul.test();


// https://hs-esslingen.webex.com/meet/andreas.roessler

function onload() {
}

function any(o) {
    let i = o + 1;
}

function outer(i) {
    let _i = i, name = "object";


    function privFunction() {
        _i *= 2;
    }

    function inner() {
        privFunction();
        return ++_i;
    }
    return inner;
}


function Tier(n) {
    let name = n;

    function getName() {
        return name;
    }

    return getName;
}


function Saeuger(n, g) {
    let gewicht = g;
    let base = Tier(n);

    function eat(g) {
        gewicht += g;
    }


    return { eat, base };
}







function outerWithObject(i) {
    let that = {
        i: i,
        f: function () { ++i }
    };
    return that;
}





window.onload = () => {
    let counterFunction = outer(15);
    let o = outerWithObject();
    o.i += 13;
    o.f();

    let counterFunction2 = outer(27);
    console.log("counterFunction", counterFunction());
    console.log("counterFunction", counterFunction());
    console.log("counterFunction", counterFunction());
    console.log("counterFunction2", counterFunction2());


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

