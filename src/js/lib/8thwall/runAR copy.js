export default function runAR(customPipelineModule) {
  window.onload = () => {
    window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load);
  };

  const load = () => {
    XRExtras.Loading.showLoading({ onxrloaded });
  };

  const onxrloaded = () => {
    const pipelineModules = [
      XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
      XR8.Threejs.pipelineModule(), // Creates a ThreeJS AR Scene.
      XR8.XrController.pipelineModule(), // Enables SLAM tracking.
      XRExtras.AlmostThere.pipelineModule(), // Detects unsupported browsers and gives hints.
      XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
      XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
      XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
      customPipelineModule()
    ];
    XR8.addCameraPipelineModules(pipelineModules);
    XR8.run({
      canvas: document.getElementById('camerafeed'),
      webgl2: true
    });
  };
}
