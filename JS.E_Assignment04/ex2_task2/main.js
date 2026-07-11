const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const x = 60;
const y = 60;
const width = 150;
const height = 100;
const color = 'blue';

function drawRect(x, y, width, height, color) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

drawRect(x, y, width, height, color);
