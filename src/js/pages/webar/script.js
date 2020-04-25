import runAR from '@/js/lib/8thwall/runAR';
import Stats from '@/js/lib/stats/StatsTicker';
import threeHelpers from '@/js/lib/three/ThreeHelpers';
import ThreeGround from '@/js/lib/three/meshes/ThreeGround';
import ThreeVideoPlane from '@/js/lib/three/meshes/ThreeVideoPlane';
import XrThreeBase from '@/js/lib/8thwall/XrThreeBase';
import ThreeDirectionalLight from '../../lib/three/lights/ThreeDirectionalLight';
import ThreeAmbientLight from '../../lib/three/lights/ThreeAmbientLight';

let _stats = null;
let _videoEl = document.querySelector('.videos__takagi');
let _threeAmbientLight = null;
let _threeDirectionalLight = null;
let _threeGround = null;
let _threeVideoPlane = null;
let _xrThreeBase = null;

const onStart = () => {
  _xrThreeBase = new XrThreeBase();
  _stats = new Stats();

  // three helper
  threeHelpers.initAxisHelper('centerAxis', _xrThreeBase.scene);
  //threeHelpers.initGridHelper('groundGrid', _xrThreeBase.scene);
  threeHelpers.addHelpers();

  // Ground
  _threeGround = new ThreeGround();
  _threeGround.add(_xrThreeBase.scene);

  // VideoPlane
  _threeVideoPlane = new ThreeVideoPlane({
    videoEl: _videoEl
  });
  _threeVideoPlane.init();
  _threeVideoPlane.move(new THREE.Vector3(0, 2, -3));
  _videoEl.play();
  _threeVideoPlane.addTo(_xrThreeBase.scene);

  // Directional Light
  _threeDirectionalLight = new ThreeDirectionalLight();
  _threeDirectionalLight.move(new THREE.Vector3(0, 10, 10));
  _threeDirectionalLight.addTo(_xrThreeBase.scene);

  // Ambient Light
  _threeAmbientLight = new ThreeAmbientLight({
    force: 0.4
  });
  _threeAmbientLight.addTo(_xrThreeBase.scene);
};

const onUpdate = () => {
  _stats.update();
};

runAR(getCustomPipeline);
function getCustomPipeline() {
  return {
    name: 'WebARMock',
    onStart,
    onUpdate
  };
}
