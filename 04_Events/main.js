import * as cl from "./canvas_lib.mjs";

window.onload = () => {
    const ctx = cl.initCanvas('canvas');

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

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
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let c of circles) {
            const x = offset + c.x * size;
            const y = offset + c.y * size;
            const d = cl.distance(x, y, mouseX, mouseY);
            const color = d < radius ? "#fff" : "#0af";
            cl.circle(ctx, x, y, radius, color);
        }
        cl.cross(ctx, mouseX, mouseY);
        window.requestAnimationFrame(draw);
    }

    draw();
};

