// Funktion zum Wechseln der Farbe
function toggleColor(color) {
    return (color === 'white') ? 'black' : 'white';
}

// Funktion, um ein Schachbrett zu zeichnen
function drawChessBoard(ctx, width) {
    const squareSize = width / 8;
    let color = 'white';

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            ctx.fillStyle = color;
            ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
            color = toggleColor(color);
        }
        color = toggleColor(color);
    }
}

// Funktion, um die Notation zu zeichnen
function drawNotation(ctx, width) {
    const squareSize = width / 8;
    const notationLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let color = 'white';

    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            const notation = `${notationLetters[x]}${8 - y}`;

            // Textfarbe abhängig von der Feldfarbe setzen
            ctx.fillStyle = toggleColor(color);

            // Notation rendern
            ctx.fillText(notation, (x + 0.5) * squareSize, (y + 0.5) * squareSize);

            // Farbe für das nächste Quadrat ändern
            color = toggleColor(color);
        }

        // Die Farbe für den Start der nächsten Schachbrett-Reihe ändern
        color = toggleColor(color);
    }
}

// Canvas-Element abrufen und Kontext erhalten
const canvas = document.getElementById('meinCanvas');
const ctx = canvas.getContext('2d');

// Schachbrett und Notation zeichnen
drawChessBoard(ctx, canvas.width);
drawNotation(ctx, canvas.width);
