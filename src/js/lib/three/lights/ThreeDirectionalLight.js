/**
 * Three.js : 直接光
 */

import _ from 'lodash';
import ThreeLightBase from './ThreeLightBase';

const CONFIG_DEFAULT = {
  color: 0xffffff,
  force: 1
};

export default class ThreeDirectionalLight extends ThreeLightBase {
  constructor(config = null) {
    super();
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.init();
  }

  init() {
    this.light = new THREE.DirectionalLight(
      this.config.color,
      this.config.force
    );
  }
}
