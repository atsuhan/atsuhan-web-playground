/**
 * UnrealBloom
 */
import _ from 'lodash';
import '@/js/import/three/postprocessing/EffectComposer.js';
import '@/js/import/three/postprocessing/RenderPass.js';
import '@/js/import/three/postprocessing/ShaderPass.js';
import '@/js/import/three/postprocessing/BloomPass.js';
import '@/js/import/three/shader/CopyShader.js';
import '@/js/import/three/shader/ConvolutionShader.js';

const CONFIG_DEFAULT = {
  scene: null,
  camera: null,
  renderer: null,
  property: {
    strength: 0.0,
    kernelSize: 512,
    sigma: 0.0,
    resolution: 512
  }
};

export default class ThreePostprocessingBloomBasic {
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
    this.bloomPass = new THREE.BloomPass(
      this.config.property.strength,
      this.config.property.kernelSize,
      this.config.property.sigma,
      this.config.property.resolution
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
