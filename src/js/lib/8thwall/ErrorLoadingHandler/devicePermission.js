import _ from 'lodash';

const CLASS_NAMES = {
  screen: '.js-permission',
  btn: '.js-permission__btn'
};

class DevicePermission {
  constructor() {
    this.els = _.mapValues(CLASS_NAMES, classname => {
      return document.querySelector(classname);
    });
    this.isMotionPermitted = false;
    this.addEventMotion();
  }

  addEventMotion() {
    window.addEventListener(
      'devicemotion',
      () => {
        this.isMotionPermitted = true;
      },
      {
        once: true
      }
    );
  }

  checkPermission() {
    return typeof DeviceMotionEvent.requestPermission === 'function';
  }

  view() {
    this.els.screen.setAttribute('data-is-view', true);
    this.initBtnEvent();
  }
  hide() {
    this.els.screen.setAttribute('data-is-view', false);
  }

  initBtnEvent() {
    this.els.btn.addEventListener(
      'click',
      async () => {
        try {
          //  permit
          if (
            DeviceMotionEvent &&
            DeviceMotionEvent.requestPermission &&
            typeof DeviceMotionEvent.requestPermission === 'function'
          ) {
            await DeviceMotionEvent.requestPermission();
          }
          if (
            DeviceOrientationEvent &&
            DeviceOrientationEvent.requestPermission &&
            typeof DeviceOrientationEvent.requestPermission === 'function'
          ) {
            await DeviceOrientationEvent.requestPermission();
          }
          location.reload();
        } catch (e) {
          console.log(e);
        }
      },
      {
        once: true
      }
    );
  }
}
export default new DevicePermission();
