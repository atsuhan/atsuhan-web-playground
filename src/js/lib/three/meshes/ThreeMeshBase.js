/**
 * Three.js : オブジェクトの基盤
 */

export default class ThreeMeshBase {
  constructor() {
    this.parent = null;
    this.mesh = null;
  }

  addTo(parent) {
    this.parent = parent;
    this.parent.add(this.mesh);
  }

  remove() {
    this.parent.remove(this.mesh);
    this.parent = null;
  }

  move(pos) {
    this.mesh.position.copy(pos);
  }

  rotate(rot) {
    this.mesh.quaternion.copy(rot);
  }

  lookAtAxisY(target) {
    this.mesh.rotation.y = Math.atan2(
      target.position.x - this.mesh.position.x,
      target.position.z - this.mesh.position.z
    );
  }

  rotateOnAxis(axis, angle) {
    this.mesh.rotateOnAxis(axis, angle);
  }

  setScale(scaleVec) {
    if (typeof scaleVec === 'number') {
      this.mesh.scale.setScalar(scaleVec);
    }
    if (scaleVec.isVector3) {
      this.mesh.scale.copy(scaleVec);
    }
    if (Array.isArray(scaleVec)) this.mesh.scale.fromArray(scaleVec);
  }
}
