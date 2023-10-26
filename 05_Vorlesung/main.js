import * as cl from "./canvas_lib.mjs";

const radius = 50;

function create_button(ctx, x, y, options) {

    let inside = false;
    function draw() {
        if (inside) {
            cl.circle(ctx, x, y, radius, options.touched);
        } else {
            cl.circle(ctx, x, y, radius, options.color);
        }
    }

    function isInside(tx, ty) {
        inside = cl.distance(x, y, tx, ty) < radius;
        if (inside) options.callback();
    }

    return { draw, isInside };
}


window.onload = () => {
    const ctx = cl.initCanvas('canvas');


    let interactiveObjects = [], strokeStyle = "#000", points = [];

    interactiveObjects.push(create_button(ctx, 100, 100, {
        color: "#f00",
        touched: "#800",
        callback: function () { strokeStyle = "#f00"; }
    }));

    interactiveObjects.push(create_button(ctx, 200, 100, {
        color: "#0f0",
        touched: "#080",
        callback: function () { strokeStyle = "#0f0"; }
    }));

    interactiveObjects.push(create_button(ctx, 300, 100, {
        color: "#222",
        touched: "#aaa",
        callback: function () { points = []; }
    }));


    canvas.addEventListener("touchstart", (evt) => {
        evt.preventDefault();
        setFingers(evt.changedTouches, true);
    }, true);
    canvas.addEventListener("touchmove", (evt) => {
        evt.preventDefault();
        setFingers(evt.changedTouches);
    }, true);
    canvas.addEventListener("touchend", (evt) => {
        evt.preventDefault();
        rmFingers(evt.changedTouches);
    }, true);


    let fingers = [];
    function setFingers(touches, isStart = false) {
        for (let t of touches) {
            points.push({ x: t.pageX, y: t.pageY, strokeStyle, isStart })

            for (let o of interactiveObjects) {
                o.isInside(t.pageX, t.pageY);
            }
            fingers[t.identifier] = {
                x: t.pageX,
                y: t.pageY,
            };
        }
    }
    function rmFingers(touches) {
        for (let t of touches) {
            fingers[t.identifier] = undefined
        }
    }


    const size = 60;
    const radius = 30;
    const circles = [];
    const offset = 40;
    for (let x = 0; x < 10; ++x) {
        for (let y = 0; y < 10; ++y) {
            circles.push({ x, y });
        }
    }

    function draw() {
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const o of interactiveObjects) {
            o.draw();
        }

        ctx.lineWidth = 5;
        ctx.beginPath();
        for (let line of points) {
            if (line.isStart) {
                ctx.stroke();
                ctx.strokeStyle = line.strokeStyle;
                ctx.beginPath();
                ctx.moveTo(line.x, line.y);
            } else {
                ctx.lineTo(line.x, line.y);
            }
        }
        ctx.stroke();

        // for (let c of circles) {
        //     const x = offset + c.x * size;
        //     const y = offset + c.y * size;
        //     let color = "#fff";
        //     for (let f in fingers) {
        //         if (fingers[f]) {
        //             const finger = fingers[f];
        //             const d = cl.distance(x, y, finger.x, finger.y);
        //             if (d < radius) {
        //                 color = "#0af";
        //                 break;
        //             }
        //         }
        //     }

        //     cl.circle(ctx, x, y, radius, color);
        // }

        for (let f in fingers) {
            if (fingers[f]) {
                let finger = fingers[f];
                cl.circle(ctx, finger.x, finger.y, 20, "red");
            }
        }

        window.requestAnimationFrame(draw);
    }

    draw();
};

