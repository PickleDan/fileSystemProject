const path = require("path");
const util = require("util");
const { Tree } = require("./Tree");
const { Dir } = require("./Dir");
const { File } = require("./File");

const getPathParts = filepath =>
  filepath.split(path.sep).filter(part => part !== "");

class FileSystem {
  constructor() {
    this.tree = new Tree("/", new Dir("/"));
  }

  statSync(filepath) {
    const current = this.findNode(filepath);
    return current.getMeta().getStats();
  }

  touchSync(filepath) {
    const { dir, base } = path.parse(filepath);
    return this.findNode(dir).addChild(base, new File(base));
  }

  mkdirSync(filepath) {
    const { dir, base } = path.parse(filepath);
    return this.findNode(dir).addChild(base, new Dir(base));
  }

  findNode(filepath) {
    const parts = getPathParts(filepath);
    return parts.length === 0 ? this.tree : this.tree.getDeepChild(parts);
  }
}

const newFileSystem = new FileSystem("/");
newFileSystem.mkdirSync("dir");
newFileSystem.mkdirSync("etc");
newFileSystem.mkdirSync("tmp");
newFileSystem.touchSync("etc/myFile");

console.log(
  util.inspect(newFileSystem, {
    showHidden: false,
    depth: null,
    colors: true
  })
);
