export function rect(ctx, x, y, w, h, fillStyle = "#fff", strokeStyle = "#000", lineWidth = 1) {
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
}

export function line(ctx, x1, y1, x2, y2, strokeStyle = "#000", lineWidth = 1) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

export function cross(ctx, x, y, size = 10, strokeStyle = "#000", lineWidth = 1) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    ctx.lineTo(x + size, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x, y + size);
    ctx.stroke();
}

const startAngle = 0;
const endAngle = Math.PI * 2;

export function circle(ctx, x, y, radius, fillStyle = "#fff", strokeStyle = "#000", lineWidth = 1) {
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, true);
    ctx.fill();
    ctx.stroke();
}


function u_path() {
    let upath = new Path2D();
    upath.moveTo(-2, -2);
    upath.lineTo(-2, 2);
    upath.lineTo(-1, 2);
    upath.lineTo(-1, -1);
    upath.lineTo(1, -1);
    upath.lineTo(1, 2);
    upath.lineTo(2, 2);
    upath.lineTo(2, -2);
    upath.closePath();
    return upath;
}

export function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

export function initCanvas(id) {
    const canvas = document.getElementById(id);
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return ctx;
}


const radius = 50;

export function create_button(ctx, x, y, options) {

    let inside = false;
    function draw() {
        if (inside) {
            circle(ctx, x, y, radius, options.touched);
        } else {
            circle(ctx, x, y, radius, options.color);
        }
    }

    function isInside(tx, ty) {
        inside = distance(x, y, tx, ty) < radius;
        if (inside) options.callback();
    }

    function reset() {
    }
    function move() {
    }


    return { draw, isInside, reset, move };
}


function path(ctx, p, M, fillStyle = "#fff", strokeStyle = "#000", lineWidth = 1) {
    ctx.save();
    ctx.setTransform(M);
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.fill(p);
    ctx.restore();
}

function getTransform(ctx, x, y, alpha = 0, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(alpha);
    ctx.scale(scale, scale);
    let L = ctx.getTransform();
    ctx.restore();
    return L;
}

export function create_u(ctx, x, y, alpha, options) {
    let L = getTransform(ctx, x, y, alpha, options.scale);

    const p = u_path();

    let inside = false, P, touchID;
    function draw() {
        if (inside) {
            path(ctx, p, L, options.touched)
        } else {
            path(ctx, p, L, options.color)
        }
    }

    function isInside(tx, ty, id) {
        const I = (new DOMMatrix(L)).invertSelf();
        const N = I.transformPoint(new DOMPoint(tx, ty));
        inside = ctx.isPointInPath(p, N.x, N.y);
        if (inside) {
            P = getTransform(ctx, tx, ty).invertSelf().multiplySelf(L);
            console.log(`grab ${id}`);
            touchID = id;
            options.callback();
        }
    }

    function reset(id) {
        if (touchID === id) {
            touchID = undefined;
        }
    }

    function move(tx, ty, id) {
        if (id === touchID) {
            console.log(`move ${id}`);
            L = getTransform(ctx, tx, ty).multiplySelf(P);
        }
    }

    return { draw, isInside, reset, move };
}





