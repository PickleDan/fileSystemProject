const { Node } = require("./Node");
class Dir extends Node {
  isDirectory() {
    return true;
  }

  isFile() {
    return false;
  }
}

module.exports = { Dir };
// END
