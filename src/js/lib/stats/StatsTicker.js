import Stats from 'stats-js';

export default class StatsTicker {
  constructor() {
    this.stats = new Stats();
    this.init();
  }

  init() {
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    document.body.appendChild(this.stats.domElement);
  }

  begin() {
    this.stats.begin();
  }

  end() {
    this.stats.end();
  }

  update() {
    this.stats.update();
  }
}
