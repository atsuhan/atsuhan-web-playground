import runAR from '@/js/lib/8thwall/runAR';
import Stats from '@/js/lib/stats/StatsTicker';
import threeHelpers from '@/js/lib/three/ThreeHelpers';
import XrThreeBase from '@/js/lib/8thwall/XrThreeBase';

let _stats = null;
let _xrThreeBase = null;

const onStart = () => {
  _xrThreeBase = new XrThreeBase();
  _stats = new Stats();

  // helper
  threeHelpers.initAxisHelper('effectGroup', _xrThreeBase.scene);
  threeHelpers.addHelpers();
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
