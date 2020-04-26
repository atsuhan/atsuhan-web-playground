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
  renderer: null,
  property: {
    strength: 1.5,
    radius: 0.2,
    threshold: 0.85
  }
};

export default class ThreePostprocessingBloom {
  constructor(config = null) {
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.composer = null;
    this.renderPass = null;
    this.bloomPass = null;

    this.init();
  }

  init() {
    this.initRenderPass();
    this.initBloomPass();
    this.initComposer();
  }

  initRenderPass() {
    this.renderPass = new THREE.RenderPass(
      this.config.scene,
      this.config.camera
    );
  }

  initBloomPass() {
    this.bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      this.config.property.strength,
      this.config.property.radius,
      this.config.property.threshold
    );
  }

  initComposer() {
    this.composer = new THREE.EffectComposer(this.config.renderer);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.bloomPass);
  }

  update() {
    this.composer.render();
  }
}
