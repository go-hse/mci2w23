
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
            ctx.rotate(deltaTime);
            rect(ctx, 0, 0, size, 2 * size, "#f00");
            ctx.resetTransform();
        }

        window.requestAnimationFrame(draw);
    }

    draw();
};

