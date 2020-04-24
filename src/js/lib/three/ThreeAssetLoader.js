import _ from 'lodash';

class ThreeAssetLoader {
  // single
  font(url) {
    return new Promise(resolve => {
      new THREE.FontLoader().load(url, resolve);
    });
  }
  texture(url) {
    return new Promise(resolve => {
      new THREE.TextureLoader().load(url, resolve);
    });
  }
  gltf(url) {
    return new Promise(resolve => {
      new THREE.GLTFLoader().load(url, gltf => {
        resolve(gltf);
      });
    });
  }

  // multi
  gltfs(paths) {
    return Promise.all(
      _.map(paths, async path => {
        return await this.loadGltf(path);
      })
    );
  }
}
export default new ThreeAssetLoader();
