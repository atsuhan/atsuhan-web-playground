const RAYCASTER = new THREE.Raycaster();

class ThreeRaycaster {
  getRayIntersectPos(event, camera, meshes) {
    const screenPos = this.getScreenPos(event);
    RAYCASTER.setFromCamera(screenPos, camera);
    const intersects = RAYCASTER.intersectObjects(meshes);
    return intersects.length > 0 ? intersects[0].point : null;
  }

  getScreenPos(event) {
    const touch = event.touches ? event.touches[0] : event;
    const element = event.target;

    const x = touch.clientX - element.offsetLeft;
    const y = touch.clientY - element.offsetTop;
    const w = element.offsetWidth;
    const h = element.offsetHeight;

    return {
      x: (x / w) * 2 - 1,
      y: -(y / h) * 2 + 1
    };
  }
}
export default new ThreeRaycaster();
