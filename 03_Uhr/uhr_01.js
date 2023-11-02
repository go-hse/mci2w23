
function rect(ctx, x, y, w, h, fillStyle = "#fff", strokeStyle = "#000", lineWidth = 1) {
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
}

function line(ctx, x1, y1, x2, y2, strokeStyle = "#000", lineWidth = 1) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function cross(ctx, x, y, len = 10, strokeStyle = "#000", lineWidth = 1) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x, y - len);
    ctx.lineTo(x, y + len);
    ctx.stroke();
    ctx.moveTo(x - len, y);
    ctx.lineTo(x + len, y);
    ctx.stroke();
}

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
            cross(ctx, 0, 0);
            ctx.rotate(deltaTime);
            rect(ctx, 0, 0, size, 2 * size, "#f00");
            ctx.resetTransform();
        }

        {
            ctx.translate(400, 200);
            ctx.save();
            ctx.rotate(deltaTime * 2);
            rect(ctx, -size / 2, -size, size, 2 * size, "#f00");
            // rect(ctx, -15, -45, size, 2 * size, "#f00");
            ctx.restore();
            cross(ctx, 0, 0);
            ctx.resetTransform();
        }

        const delta = Math.PI / 30;
        const radius = canvas.height / 10;

        const sec = now.getSeconds();
        const min = now.getMinutes() + sec / 60;
        const hrs = now.getHours() + min / 60;

        {
            ctx.translate(200, 400);
            cross(ctx, 0, 0);

            for (let i = 0; i < 60; ++i) {
                if (i % 5 === 0)
                    line(ctx, radius - 5, 0, radius + 5, 0);
                else
                    line(ctx, radius, 0, radius + 5, 0);
                ctx.rotate(delta);
            }
            ctx.resetTransform();

            ctx.translate(200, 400);
            ctx.rotate((sec - 15) * delta);
            line(ctx, 0, 0, radius, 0, "#f00");
            ctx.resetTransform();

            ctx.translate(200, 400);
            ctx.rotate((min - 15) * delta);
            line(ctx, 0, 0, radius, 0, "#00f", 3);
            ctx.resetTransform();

            ctx.translate(200, 400);
            ctx.rotate((hrs - 3) * delta * 5);
            line(ctx, 0, 0, radius / 2, 0, "#00f", 3);
            ctx.resetTransform();


        }


        window.requestAnimationFrame(draw);
    }

    draw();
};

