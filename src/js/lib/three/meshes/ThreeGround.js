/**
 * XR地面クラス
 */

import _ from 'lodash';

const CONFIG_DEFAULT = {
  color: 0xffffff,
  transparent: true,
  opacity: 0,
  scale: new THREE.Vector3(100, 100, 1),
  receiveShadow: true
};

export default class ThreeGround {
  constructor(config = null) {
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.material = null;
    this.mesh = null;

    this.init();
  }

  init() {
    this.material = new THREE.MeshPhongMaterial({
      color: this.config.color,
      opacity: this.config.opacity,
      transparent: this.config.transparent
    });
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(), this.material);
    this.mesh.scale.copy(this.config.scale);
    this.mesh.receiveShadow = this.config.receiveShadow;
    this.mesh.rotateX(-Math.PI / 2);
  }

  move(pos) {
    this.mesh.position.copy(pos);
    this.mesh.position.y = 0;
  }

  add(parent) {
    parent.add(this.mesh);
  }

  remove(parent) {
    parent.remove(this.mesh);
  }
}
