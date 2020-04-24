import _ from 'lodash';

const CLASS_NAMES = {
  camErrorAndroid: '.js-camerror-android',
  camErrorIOS: '.js-camerror-ios',
  error: '.js-error',
  loading: '.js-loading',
  pc: '.js-pc'
};

class overlayController {
  constructor() {
    this.els = _.mapValues(CLASS_NAMES, classname => {
      return document.querySelector(classname);
    });
  }

  /**
   * methods
   */
  view(classname) {
    this.els[classname].setAttribute('data-is-view', true);
  }
  viewCamError(os) {
    switch (os) {
      case 'iOS':
        this.view('camErrorIOS');
        break;
      case 'Android':
        this.view('camErrorAndroid');
        break;
    }
  }
  viewError() {
    this.view('error');
  }
  viewLoading() {
    this.view('loading');
  }
  viewPC() {
    this.view('pc');
  }

  // hide
  hideAll() {
    _.forEach(this.els, el => {
      el.setAttribute('data-is-view', false);
    });
  }
}
export default new overlayController();
