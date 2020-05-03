/**
 * パーティクルテスト
 */

import vertexShader from './colorful.vert';
import fragmentShader from './colorful.frag';

var MOVABLE_RADIUS = 10;
var PARTICLE_COUNT = 100;
const WIDTH = 0.4;

export default class ThreeParticlesColorful {
  constructor() {
    this.parent;

    this.uniforms;
    this.particles;
    this.geometry;
    this.material;
  }

  init() {
    //geometory
    let positions = [];
    let colors = [];
    let sizes = [];
    let color = new THREE.Color();

    for (var i = 0; i < PARTICLE_COUNT; i++) {
      positions.push((Math.random() * 2 - 1) * MOVABLE_RADIUS);
      positions.push((Math.random() * 2 - 1) * MOVABLE_RADIUS);
      positions.push((Math.random() * 2 - 1) * MOVABLE_RADIUS);
      color.setHSL(i / PARTICLE_COUNT, 1.0, 0.5);
      colors.push(color.r, color.g, color.b);
      sizes.push(WIDTH);
    }

    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );
    this.geometry.setAttribute(
      'size',
      new THREE.Float32BufferAttribute(sizes, 1).setUsage(
        THREE.DynamicDrawUsage
      )
    );

    //material
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: {
          value: new THREE.TextureLoader().load('/img/note.png')
        }
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: THREE.AdditiveBlending,
      depthWrite: true,
      transparent: true,
      vertexColors: true
    });

    this.particles = new THREE.Points(this.geometry, this.material);
  }

  update() {
    const time = Date.now() * 0.005;
    this.particles.rotation.y = 0.04 * time;
    var sizes = this.geometry.attributes.size.array;

    for (var i = 0; i < PARTICLE_COUNT; i++) {
      sizes[i] = WIDTH * (1 + Math.sin(0.3 * i + time) / 2);
    }
    this.geometry.attributes.size.needsUpdate = true;
  }

  addTo(parent) {
    this.parent = parent;
    this.parent.add(this.particles);
  }

  remove() {
    this.parent.remove(this.particles);
    this.parent = null;
  }

  move(pos) {
    this.particles.position.copy(pos);
  }

  rotate(rot) {
    this.particles.quaternion.copy(rot);
  }
}
