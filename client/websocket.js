const socket = io();

socket.on("initCanvas", (ops) => {
  ops.forEach((op) => drawFromServer(op));
});

socket.on("remoteDraw", (op) => drawFromServer(op));
socket.on("applyUndo", (data) => redrawCanvas(data, "undo"));
socket.on("applyRedo", (data) => redrawCanvas(data, "redo"));
socket.on("clearAll", () => clearCanvasLocal());

function emitDraw(op) {
  socket.emit("drawOp", op);
}
function requestUndo() { socket.emit("undo"); }
function requestRedo() { socket.emit("redo"); }
function clearCanvasRemote() { socket.emit("clearCanvas"); }
