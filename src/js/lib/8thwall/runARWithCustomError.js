/**
 * 8thWall空間認識ARの初期起動スクリプト(エラー画面カスタムバージョン)
 * @param {function} customPipelineModule コンテンツによって編集する部分のモジュール
 */
import loadingErrorModule from '@/js/lib/8thwall/loadingErrorModule';
import locationParam from '@/js/lib/utils/locationParams';
import devicePermission from '@/js/lib/8thwall/devicePermission';

const XRRUN_PARAMS = {
  canvas: document.getElementById('camerafeed'),
  webgl2: true
};

export default function runARWithCustomError(customPipelineModule) {
  window.onload = () => {
    window.XRExtras ? load() : window.addEventListener('xrextrasloaded', load);
  };
  const load = () => {
    XRExtras.Loading.showLoading({ onxrloaded });
  };
  const onxrloaded = () => {
    const pipelineModules = [
      XR8.GlTextureRenderer.pipelineModule(),
      XR8.Threejs.pipelineModule(),
      XR8.XrController.pipelineModule(),
      XR8.CanvasScreenshot.pipelineModule(),
      XRExtras.FullWindowCanvas.pipelineModule(),
      loadingErrorModule(),
      customPipelineModule()
    ];
    XR8.addCameraPipelineModules(pipelineModules);

    if (
      devicePermission.isMotionPermitted ||
      XR8.XrDevice.deviceEstimate().os !== 'iOS'
    ) {
      XR8.run(XRRUN_PARAMS);
    } else {
      if (locationParam.debug == 'true') XR8.run(XRRUN_PARAMS);
    }
  };
}
