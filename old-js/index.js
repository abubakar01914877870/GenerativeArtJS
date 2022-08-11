const canvas = document.getElementById('my-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.rect(100, 100, 100, 100);
ctx.stroke();
console.log(ctx);