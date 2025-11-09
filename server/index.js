const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { OperationLog } = require("./operations");
const { SnapshotManager } = require("./snapshot");

const app = express();
app.use(cors());
app.use(express.static("client"));

const server = http.createServer(app);
const io = new Server(server);

const opLog = new OperationLog();
const snapshot = new SnapshotManager(opLog);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // send full snapshot when new user joins
  socket.emit("initCanvas", snapshot.getCanvasState());

  socket.on("drawOp", (operation) => {
    opLog.add(operation);
    io.emit("remoteDraw", operation); // broadcast to all users
  });

  socket.on("undo", () => {
    const undone = opLog.undo();
    if (undone) io.emit("applyUndo", undone);
  });

  socket.on("redo", () => {
    const redone = opLog.redo();
    if (redone) io.emit("applyRedo", redone);
  });

  socket.on("clearCanvas", () => {
    opLog.clear();
    io.emit("clearAll");
  });

  socket.on("disconnect", () =>
    console.log("User disconnected:", socket.id)
  );
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
