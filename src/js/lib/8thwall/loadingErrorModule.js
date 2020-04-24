import _ from 'lodash';
import overlayController from '@/js/lib/common/overlay/overlayController';
import devicePermission from '@/js/lib/8thwall/devicePermission';

let isStarted = false;

/**
 * event
 */
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') location.reload();
});

/**
 * process
 */
const onAwake = () => {
  if (devicePermission.isMotionPermitted) return;
  if (XR8.XrDevice.deviceEstimate().os !== 'iOS') return;

  if (XR8.XrDevice.deviceEstimate().osVersion.startsWith('13')) {
    devicePermission.view();
  } else {
    overlayController.viewCamError('iOS');
  }
};

const onCameraStatusChange = ({ status }) => {
  if (!XR8.XrDevice.isDeviceBrowserCompatible()) return;

  const deviceEstimate = XR8.XrDevice.deviceEstimate();
  switch (status) {
    case 'failed':
      console.error('onCameraStatusChange failed.');
      overlayController.hideAll();

      // android or ios camera permission Error
      if (_.includes(['Android', 'iOS'], deviceEstimate.os) && !isStarted) {
        overlayController.viewCamError(deviceEstimate.os);
      } else {
        overlayController.viewError();
      }
      XR8.pause();
      XR8.stop();
      break;

    case 'hasVideo':
      overlayController.hideAll();
      isStarted = true;
      break;
  }
};

const onException = error => {
  overlayController.hideAll();

  // pc error
  const deviceEstimate = XR8.XrDevice.deviceEstimate();
  const isSP = _.includes(['Android', 'iOS'], deviceEstimate.os);
  if (!isSP) {
    overlayController.viewPC();
    return;
  }

  // sp error
  console.error('XR threw an exception(SP)', error);
  overlayController.viewError();

  XR8.pause();
  XR8.stop();
};

/**
 * run & export
 */
export default function loadingErrorModule() {
  onAwake();
  return {
    name: 'OriginalLoadingModule',
    onCameraStatusChange,
    onException
  };
}
