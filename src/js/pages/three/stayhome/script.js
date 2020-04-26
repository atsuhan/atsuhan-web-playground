window.addEventListener('load', () => {
  init();
});

const init = () => {
  // size
  const width = window.innerWidth;
  const height = window.innerHeight;
  let rot = 0;
  let mouseX = 0;

  // renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#canvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // scene
  const scene = new THREE.Scene();

  // camera
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, +1000);
  // const controls = new THREE.OrbitControls(camera);

  // light
  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // geometries
  // earth
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    'https://dl.dropbox.com/s/hrjpchdgqn5c9cj/earthmap.jpg?dl=0'
  );
  const bumpTex = loader.load(
    'https://dl.dropbox.com/s/r2iukhj2w4u6scw/earthbump.jpg?dl=0'
  );
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    bumpMap: bumpTex,
    bumpScale: 0.05
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // star
  const starsGeometry = new THREE.Geometry();
  for (let i = 0; i < 10000; i++) {
    const star = new THREE.Vector3();
    star.x = THREE.Math.randFloatSpread(2000);
    star.y = THREE.Math.randFloatSpread(2000);
    star.z = THREE.Math.randFloatSpread(2000);
    starsGeometry.vertices.push(star);
  }
  console.log(starsGeometry);
  const starsMaterial = new THREE.PointsMaterial({ color: 0x888888, size: 10 });
  const starField = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(starField);

  document.addEventListener('mousemove', event => {
    mouseX = event.pageX;
  });

  tick();
  function tick() {
    const targetRot = (mouseX / window.innerWidth) * 360;
    rot += (targetRot - rot) * 0.02;
    const radian = (rot * Math.PI) / 180;
    camera.position.x = 1000 * Math.sin(radian);
    camera.position.z = 1000 * Math.cos(radian);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
};
