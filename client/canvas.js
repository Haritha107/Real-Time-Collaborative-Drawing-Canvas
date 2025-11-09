const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

let drawing = false;
let color = document.getElementById("color").value;
let size = document.getElementById("size").value;

document.getElementById("color").onchange = (e) => color = e.target.value;
document.getElementById("size").onchange = (e) => size = e.target.value;

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", end);
canvas.addEventListener("mouseout", end);
canvas.addEventListener("mousemove", draw);

document.getElementById("undo").onclick = requestUndo;
document.getElementById("redo").onclick = requestRedo;
document.getElementById("clear").onclick = clearCanvasRemote;

function start(e) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}
function end() {
  drawing = false;
  ctx.closePath();
}
function draw(e) {
  if (!drawing) return;
  const x = e.offsetX, y = e.offsetY;
  ctx.lineWidth = size;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.lineTo(x, y);
  ctx.stroke();
  emitDraw({ x, y, color, size });
}

function drawFromServer(op) {
  ctx.lineWidth = op.size;
  ctx.lineCap = "round";
  ctx.strokeStyle = op.color;
  ctx.lineTo(op.x, op.y);
  ctx.stroke();
}
function clearCanvasLocal() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function redrawCanvas(data, type) {
  clearCanvasLocal();
  console.log(`${type} applied`, data);
}
