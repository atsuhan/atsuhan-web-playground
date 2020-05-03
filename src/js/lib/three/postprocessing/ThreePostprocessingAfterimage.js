/**
 * UnrealBloom
 */
import _ from 'lodash';
import '@/js/import/three/postprocessing/EffectComposer.js';
import '@/js/import/three/postprocessing/RenderPass.js';
import '@/js/import/three/postprocessing/ShaderPass.js';
import '@/js/import/three/postprocessing/AfterimagePass.js';
import '@/js/import/three/shader/CopyShader.js';
import '@/js/import/three/shader/AfterimageShader.js';

const CONFIG_DEFAULT = {
  scene: null,
  camera: null,
  renderer: null
};

export default class ThreePostprocessingBloom {
  constructor(config = null) {
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.composer = null;
    this.renderPass = null;
    this.afterimagePass = null;

    this.init();
  }

  init() {
    this.initRenderPass();
    this.initAfterimagePass();
    this.initComposer();
  }

  initRenderPass() {
    this.renderPass = new THREE.RenderPass(
      this.config.scene,
      this.config.camera
    );
  }

  initAfterimagePass() {
    this.afterimagePass = new THREE.AfterimagePass();
  }

  initComposer() {
    this.composer = new THREE.EffectComposer(this.config.renderer);
    this.composer.addPass(this.renderPass);
    this.composer.addPass(this.afterimagePass);
  }

  update() {
    this.composer.render();
  }
}
