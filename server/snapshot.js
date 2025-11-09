const fs = require("fs");

class SnapshotManager {
  constructor(opLog) {
    this.opLog = opLog;
    this.saveInterval = 10000; // every 10s
    setInterval(() => this.saveSnapshot(), this.saveInterval);
  }

  getCanvasState() {
    return this.opLog.getAll();
  }

  saveSnapshot() {
    fs.writeFileSync(
      "snapshot.json",
      JSON.stringify(this.opLog.getAll(), null, 2)
    );
  }
}
module.exports = { SnapshotManager };
