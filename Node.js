const { Stats } = require("./Stats");
class Node {
  constructor(name) {
    this.name = name;
  }

  getStats() {
    return new Stats(this.isFile(), this.isDirectory());
  }

  getName() {
    return this.name;
  }
}

module.exports = { Node };
