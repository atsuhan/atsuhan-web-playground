/**
 * ビデオ板
 */

import _ from 'lodash';
import ThreeMeshBase from './ThreeMeshBase';

const CONFIG_DEFAULT = {
  videoEl: document.querySelector('video'),
  transparent: true,
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
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: this.texture,
      transparent: this.config.transparent,
      side: THREE.DoubleSide
    });

    // mesh
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(), this.material);
    this.mesh.receiveShadow = this.config.receiveShadow;
  }

  setScaleVideoAspect(widthScale) {
    const aspectRatio =
      this.config.videoEl.videoHeight / this.config.videoEl.videoWidth;
    const scaleVec = new THREE.Vector3(widthScale, widthScale * aspectRatio, 1);
    this.mesh.scale.copy(scaleVec);
  }
}
