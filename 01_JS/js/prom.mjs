
function handler() {
    console.log("Handler", new Date());
}

function wait(timeout = 1000) {
    function innerWait(resolve, reject) {
        setTimeout(resolve, timeout);
    }
    return new Promise(innerWait);
}

function httpGet(url, callback) {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.responseType = 'json';
    req.onload = function () {
        if (req.status === 200) {
            callback(null, req.response);
        } else {
            callback(req.status, "");
        }
    }
    req.send();
}

function httpGetPromise(url) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("GET", url);
        req.responseType = 'json';
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(`Error in ${url} status ${req.status}`);
            }
        }
        req.send();
    });

}
export const GET_URL = "/01_JS/api/test.json";

export async function test() {
    console.log("vor get");
    let json;
    try {
        json = await httpGetPromise(GET_URL);
    } catch (ex) {
        console.log(ex);
    }
    console.log("json", json);


}

// setTimeout(handler, 1000);

// await wait(3000);
// httpGet(GET_URL, (err, obj) => {
//     if (err === null) {
//         console.log(obj);
//     } else {
//         console(err);
//     }
// });
