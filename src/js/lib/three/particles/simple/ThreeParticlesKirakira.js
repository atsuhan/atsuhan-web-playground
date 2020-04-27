/**
 * パーティクルテスト
 */

import _ from 'lodash';

const CONFIG_DEFAULT = {};

export default class ThreeParticlesKirakira {
  constructor(config = null) {
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.pointCloud;
    this.geometry;
    this.texture;
    this.material;
    this.parent;
  }

  init() {
    this.geometry = new THREE.Geometry();
    for (var i = 0; i < 1000; i++) {
      this.geometry.vertices.push(
        new THREE.Vector3(
          30.0 * (Math.random() - 0.5),
          10.0 * Math.random(),
          30.0 * (Math.random() - 0.5)
        )
      );
    }

    const texLoader = new THREE.TextureLoader();
    this.texture = texLoader.load('/img/particleTex.png');
    this.material = new THREE.PointCloudMaterial({
      map: this.texture,
      size: 0.1,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    this.pointCloud = new THREE.PointCloud(this.geometry, this.material);
  }

  addTo(parent) {
    this.parent = parent;
    this.parent.add(this.pointCloud);
  }

  remove() {
    this.parent.remove(this.pointCloud);
    this.parent = null;
  }

  move(pos) {
    this.pointCloud.position.copy(pos);
  }

  rotate(rot) {
    this.pointCloud.quaternion.copy(rot);
  }
}
