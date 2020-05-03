/**
 * Three.js : ライトクラスのベース
 */

export default class ThreeLightBase {
  constructor() {
    this.parent = null;
    this.light = null;
  }

  addTo(parent) {
    this.parent = parent;
    this.parent.add(this.light);
  }

  remove() {
    this.parent.remove(this.light);
    this.parent = null;
  }

  move(pos) {
    this.light.position.copy(pos);
  }
}
