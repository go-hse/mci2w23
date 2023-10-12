import * as cl from "./canvas_lib.mjs";

window.onload = () => {
    const ctx = cl.initCanvas('canvas');
    const startTime = new Date();

    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    const size = 40;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const now = new Date();
        const deltaTime = (now - startTime) / 1000; // Zeit ab Start in Sekunden
        ctx.translate(mouseX, mouseY);
        cl.cross(ctx, 0, 0);
        ctx.rotate(deltaTime);
        cl.rect(ctx, 0, 0, size, 2 * size, "#ff0");
        cl.circle(ctx, 0, 0, 30, "#f00");
        ctx.resetTransform();

        window.requestAnimationFrame(draw);
    }

    draw();
};

