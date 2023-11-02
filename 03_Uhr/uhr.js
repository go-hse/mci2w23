
import * as cl from "./canvas_lib.mjs";

// import { rect, cross, line } from "./canvas_lib.mjs";

window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const startTime = new Date();

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const size = 40;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const now = new Date();
        const deltaTime = (now - startTime) / 1000; // Zeit ab Start in Sekunden
        {
            ctx.translate(200, 200);
            cl.cross(ctx, 0, 0);
            ctx.rotate(deltaTime);
            cl.rect(ctx, 0, 0, size, 2 * size, "#ff0");
            ctx.resetTransform();
        }

        {
            ctx.translate(400, 200);
            ctx.save();
            ctx.rotate(deltaTime);
            ctx.translate(-size / 2, -size);
            cl.rect(ctx, 0, 0, size, 2 * size, "#ff0");
            ctx.restore();
            cl.cross(ctx, 0, 0);
            ctx.resetTransform();
        }

        {
            ctx.translate(600, 200);
            ctx.rotate(deltaTime);
            ctx.translate(size / 2, size);
            cl.rect(ctx, 0, 0, size, 2 * size, "#ff0");
            ctx.resetTransform();
            ctx.translate(600, 200);
            cl.cross(ctx, 0, 0);
            ctx.resetTransform();
        }

        const radius = 100;
        const tickSize = 10;
        const delta = Math.PI / 30;
        const sec = now.getSeconds();
        const min = now.getMinutes() + sec / 60;
        const hrs = now.getHours() + min / 60;
        {
            // Uhr
            ctx.translate(600, 400);
            cl.cross(ctx, 0, 0);
            for (let i = 0; i < 60; ++i) {
                if (i % 5 === 0) {
                    cl.line(ctx, radius - tickSize, 0, radius + tickSize, 0);
                } else {
                    cl.line(ctx, radius, 0, radius + tickSize, 0);
                }
                ctx.rotate(delta);

            }
            ctx.resetTransform();
            // Hours
            ctx.translate(600, 400);
            ctx.rotate((hrs - 3) * delta * 5);
            cl.line(ctx, 0, 0, radius * 0.6, 0, "#000", 5);
            ctx.resetTransform();
            // Minutes 
            ctx.translate(600, 400);
            ctx.rotate(min * delta);

            // Senkrechte Linie nach Oben
            cl.line(ctx, 0, 0, 0, -radius * 0.8, "#000", 3);
            ctx.resetTransform();
            // Seconds
            ctx.translate(600, 400);
            ctx.rotate((sec - 15) * delta);

            // Waagerechte Linie nach rchts
            cl.line(ctx, 0, 0, radius, 0, "#f00");
            ctx.resetTransform();
        }


        window.requestAnimationFrame(draw);
    }

    draw();
};

