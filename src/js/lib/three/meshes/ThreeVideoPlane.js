/**
 * ビデオ板
 */

import _ from 'lodash';
import ThreeMeshBase from './ThreeMeshBase';

const CONFIG_DEFAULT = {
  videoEl: document.querySelector('video'),
  scale: new THREE.Vector3(1.92, 1.08, 1),
  receiveShadow: true
};

export default class ThreeVideoPlane extends ThreeMeshBase {
  constructor(config = null) {
    super();

    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.texture = null;
    this.material = null;
  }

  init() {
    // texture
    this.texture = new THREE.VideoTexture(this.config.videoEl);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.format = THREE.RGBFormat;

    // material
    this.material = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      map: this.texture
    });

    // mesh
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(), this.material);
    this.mesh.scale.copy(this.config.scale);
    this.mesh.receiveShadow = this.config.receiveShadow;
  }
}
