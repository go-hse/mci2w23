import * as cl from "./canvas_lib.mjs";



window.onload = () => {
    const ctx = cl.initCanvas('canvas');


    let interactiveObjects = [], strokeStyle = "#000", points = [];

    interactiveObjects.push(cl.create_button(ctx, 100, 100, {
        color: "#f00",
        touched: "#800",
        callback: function () { strokeStyle = "#f00"; }
    }));

    interactiveObjects.push(cl.create_button(ctx, 200, 100, {
        color: "#0f0",
        touched: "#080",
        callback: function () { strokeStyle = "#0f0"; }
    }));

    interactiveObjects.push(cl.create_button(ctx, 300, 100, {
        color: "#222",
        touched: "#aaa",
        callback: function () { points = []; }
    }));


    interactiveObjects.push(cl.create_u(ctx, 100, 300, Math.PI / 2, {
        color: "#f22",
        touched: "#aaf",
        callback: function () { }
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

            if (isStart) {
                for (let o of interactiveObjects) {
                    o.isInside(t.pageX, t.pageY, t.identifier);
                }
            } else {
                for (let o of interactiveObjects) {
                    o.move(t.pageX, t.pageY, t.identifier);
                }

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
            for (let o of interactiveObjects) {
                o.reset(t.identifier);
            }
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

