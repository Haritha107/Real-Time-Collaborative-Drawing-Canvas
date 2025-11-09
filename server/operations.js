class OperationLog {
  constructor() {
    this.operations = [];
    this.undoStack = [];
  }

  add(op) {
    this.operations.push(op);
    this.undoStack = [];
  }

  undo() {
    if (this.operations.length === 0) return null;
    const undone = this.operations.pop();
    this.undoStack.push(undone);
    return { undone };
  }

  redo() {
    if (this.undoStack.length === 0) return null;
    const redone = this.undoStack.pop();
    this.operations.push(redone);
    return { redone };
  }

  clear() {
    this.operations = [];
    this.undoStack = [];
  }

  getAll() {
    return this.operations;
  }
}
module.exports = { OperationLog };
