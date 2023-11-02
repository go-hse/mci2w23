// Funktion, um ein Schachbrett zu zeichnen
function drawChessBoard(ctx, width, height) {
    const squareSize = width / 8;
    let color = 'white';

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            ctx.fillStyle = color;
            ctx.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);

            // Farbe für das nächste Quadrat ändern
            color = (color === 'white') ? 'black' : 'white';
        }

        // Die Farbe für den Start der nächsten Schachbrett-Reihe ändern
        color = (color === 'white') ? 'black' : 'white';
    }
}

// Funktion, um die Notation zu zeichnen
function drawNotation(ctx, width, height) {
    const squareSize = width / 8;
    const notation = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    let color = 'white';

    ctx.font = "18px Arial";

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            ctx.fillStyle = (color === 'white') ? 'black' : 'white';
            ctx.fillText(notation[j], (j + 0.5) * squareSize - 5, (i + 0.5) * squareSize + 5);
            ctx.fillText(String(8 - i), (j + 0.5) * squareSize - 5, (i + 0.5) * squareSize + 5);

            // Farbe für das nächste Quadrat ändern
            color = (color === 'white') ? 'black' : 'white';
        }

        // Die Farbe für den Start der nächsten Schachbrett-Reihe ändern
        color = (color === 'white') ? 'black' : 'white';
    }
}

// Canvas-Element abrufen und Kontext erhalten
const canvas = document.getElementById('meinCanvas');
const ctx = canvas.getContext('2d');

// Schachbrett und Notation zeichnen
drawChessBoard(ctx, canvas.width, canvas.height);
drawNotation(ctx, canvas.width, canvas.height);
