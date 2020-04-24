import _ from 'lodash';

/**
 * Three.jsのHelper作成・管理クラス
 */
class ThreeHelpers {
  constructor() {
    this.helper = {};
  }

  // create
  initAxisHelper(name, parent, size = 1) {
    const axisHelper = new THREE.AxesHelper(size);
    this.helper[name] = {
      parent,
      helper: axisHelper
    };
  }

  initBoxHelper(name, parent, mesh) {
    const boxHelper = new THREE.BoxHelper(mesh);
    this.helper[name] = {
      parent,
      helper: boxHelper
    };
  }

  // add and remove
  addHelpers() {
    _.forEach(this.helper, helperInfo => {
      const { parent, helper } = helperInfo;
      parent.add(helper);
    });
  }

  removeHelper() {
    _.forEach(this.helper, helperInfo => {
      const { parent, helper } = helperInfo;
      parent.remove(helper);
    });
  }
}
export default new ThreeHelpers();
