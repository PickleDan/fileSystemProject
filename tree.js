class Tree {
  constructor(key, meta, parent) {
    this.parent = parent;
    this.key = key;
    this.meta = meta;
    this.children = new Map();
  }

  getKey() {
    return this.key;
  }

  getMeta() {
    return this.meta;
  }

  addChild(key, meta) {
    const child = new Tree(key, meta, this);
    this.children.set(key, child);

    return child;
  }

  getChild(key) {
    return this.children.get(key);
  }

  hasChildren() {
    return this.children.size !== 0 ? true : false;
  }

  hasChild(key) {
    const child = this.getChild(key);
    return child ? true : false;
  }

  getParent() {
    return this.parent;
  }

  removeChild(key) {
    const child = this.getChild(key);
    const parentOfChild = child.parent;
    parentOfChild.children.delete(`${key}`);
  }

  getChildren() {
    const map = this.children;
    console.log([...map.values()]);
  }

//* Решение учителя
  // getDeepChild(keys) {
  //   const [key, ...rest] = keys;
  //   const node = this.getChild(key);
  //   if (!node || rest.length === 0) {
  //     return node;
  //   }
  //   return node.getDeepChild(rest);
  // }

  //? Разобрать как работает reduce
  getDeepChild(keys) {
    if (keys.length <= 0) return 'wrong path'; 
    const newArr = keys.reduce((node, key) => node && node.getChild(key), this);
    console.log(newArr);
  }
}
const tree = new Tree("/");

tree
  .addChild("var")
  .addChild("lib")
  .addChild("run");
tree.addChild("etc");
tree.addChild("home");

// const subtree = tree.getChild('var');
// console.log(subtree);
// console.log("my obj: ", tree);
