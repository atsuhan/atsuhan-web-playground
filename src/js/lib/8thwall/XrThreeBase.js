/**
 * 8thwall: three.jsのrenderer, scene, cameraを管理
 */

export default class XrThreeBase {
  constructor() {
    this.renderer = null;
    this.scene = null;
    this.camera = null;

    this.init();
  }

  init() {
    this.initRenderer();
    this.initScene();
    this.initCamera();
  }

  initRenderer() {
    this.renderer = XR8.Threejs.xrScene().renderer;
  }

  initScene() {
    this.scene = XR8.Threejs.xrScene().scene;
  }

  initCamera() {
    this.camera = XR8.Threejs.xrScene().camera;
  }
}
