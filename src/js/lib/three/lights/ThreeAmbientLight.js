/**
 * Three.js : 環境光
 */

import _ from 'lodash';
import ThreeLightBase from './ThreeLightBase';

const CONFIG_DEFAULT = {
  color: 0xffffff,
  force: 1
};

export default class ThreeAmbientLight extends ThreeLightBase {
  constructor(config = null) {
    super();
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.init();
  }

  init() {
    this.light = new THREE.AmbientLight(this.config.color, this.config.force);
  }
}
