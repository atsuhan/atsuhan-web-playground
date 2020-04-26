/**
 * UnrealBloom
 */
import _ from 'lodash';
import '@/js/import/three/postprocessing/EffectComposer.js';
import '@/js/import/three/postprocessing/RenderPass.js';
import '@/js/import/three/postprocessing/ShaderPass.js';
import '@/js/import/three/postprocessing/UnrealBloomPass.js';
import '@/js/import/three/shader/CopyShader.js';
import '@/js/import/three/shader/LuminosityHighPassShader.js';

const CONFIG_DEFAULT = {
  scene: null,
  camera: null,
  renderer: null
};

export default class ThreePostprocessingBloom {
  constructor(config = null) {
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.composer = null;

    this.init();
  }

  init() {
    const renderScene = new THREE.RenderPass(
      this.config.scene,
      this.config.camera
    );
    const bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      2,
      1,
      0
    );
    this.composer = new THREE.EffectComposer(this.config.renderer);
    this.composer.addPass(renderScene);
    this.composer.addPass(bloomPass);
  }

  update() {
    this.composer.render();
  }
}
