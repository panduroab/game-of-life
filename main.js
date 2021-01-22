ELEM = document.getElementById('gameCanvas');
CONTEXT = ELEM.getContext('2d');
LIVING = 0;
X = 50;
Y = 25;
spaceX = ELEM.width / X;
spaceY = ELEM.height / Y;
SPEED = 100;
btnStart = document.getElementById('btnStart');
btnReset = document.getElementById('btnReset');
MATRIX = [];
for (var x = 0; x < X; x++) {
    MATRIX.push([]);
    for (var y = 0; y < Y; y++) {
        MATRIX[x].push(false);
    }
}

function drawField() {
    if (CONTEXT) {
        var repeatX = 0, repeatY = 0;
        for (var x = 0; x <= X; x++) {
            CONTEXT.moveTo(repeatX, 0);
            CONTEXT.lineTo(repeatX, ELEM.height);
            CONTEXT.stroke();
            repeatX += spaceX;
        }
        for (var y = 0; y <= Y; y++) {
            CONTEXT.moveTo(0, repeatY);
            CONTEXT.lineTo(ELEM.width, repeatY);
            CONTEXT.stroke();
            repeatY += spaceY;
        }
    }
}

drawField();

function getPosition(x, y) {
    var posx = parseInt(x / spaceX);
    var posy = parseInt(y / spaceY);
    var position = {};
    MATRIX[posx][posy] = !MATRIX[posx][posy];
    return position = {
        status: MATRIX[posx][posy],
        x: posx,
        y: posy
    };
}

ELEM.addEventListener('click', function(evt) {
    var clickX = evt.offsetX === undefined ? evt.layerX : evt.offsetX;
    var clickY = evt.offsetY === undefined ? evt.layerY : evt.offsetY;
    var position = getPosition(clickX, clickY);
    if (position.status) {
        LIVING++;
        CONTEXT.fillRect(position.x * spaceX, position.y * spaceY, spaceX, spaceY);
    } else {
        LIVING--;
        CONTEXT.clearRect(position.x * spaceX, position.y * spaceY, spaceX, spaceY);
    }
}, false);

function renderMatrix() {
    for (var x = 0; x < X; x++) {
        for (var y = 0; y < Y; y++) {
            if (MATRIX[x][y]) {
                CONTEXT.fillRect(x * spaceX, y * spaceY, spaceX, spaceY);
            } else {
                CONTEXT.clearRect(x * spaceX, y * spaceY, spaceX, spaceY);
            }
        }
    }
}

btnStart.addEventListener("click", function() {
    if (LIVING <= 0) {
        alert('Haga click en algunas celdas del campo para insertar las celulas!');
        return false;
    }
    var timer = setInterval(function() {
        var newGen = [];
        for (var x = 0; x < X; x++) {
            newGen.push([]);
            for (var y = 0; y < Y; y++) {
                newGen[x].push(false);
            }
        }
        for (var j = 1; j < X - 1; j++) {
            for (var k = 1; k < Y - 1; k++) {
                var a = MATRIX[j][k];
                var total = 0;
                total += (MATRIX[j - 1][k - 1]) ? 1 : 0;
                total += (MATRIX[j - 1][k]) ? 1 : 0;
                total += (MATRIX[j - 1][k + 1]) ? 1 : 0;
                total += (MATRIX[j][k - 1]) ? 1 : 0;
                total += (MATRIX[j][k + 1]) ? 1 : 0;
                total += (MATRIX[j + 1][k - 1]) ? 1 : 0;
                total += (MATRIX[j + 1][k]) ? 1 : 0;
                total += (MATRIX[j + 1][k + 1]) ? 1 : 0;
                if (a === true && total < 2) {
                    newGen[j][k] = false;
                } else if (a === true && (total === 2 || total === 3)) {
                    newGen[j][k] = true;
                } else if (a === true && total > 3) {
                    newGen[j][k] = false;
                } else if (a === false && total === 3) {
                    newGen[j][k] = true;
                } else {
                    newGen[j][k] = false;
                }
            }
        }
        MATRIX = newGen;
        renderMatrix();
    }, SPEED);
});

btnReset.addEventListener('click', function() {
    location.reload();
});