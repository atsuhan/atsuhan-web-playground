export default class RendererStats {
  constructor(renderer) {
    this.dom = window.document.createElement('div');
    this.renderer = renderer;
    this.dom.style.position = 'absolute';
    this.dom.style.left = '0';
    this.dom.style.bottom = '0';
    this.dom.style.backgroundColor = '#000';
    this.dom.style.color = '#fff';
    this.dom.style.fontSize = '12px';
    this.dom.style.lineHeight = '1.2em';
    this.dom.style.padding = '.5em';
    this.dom.style.whiteSpace = 'pre-wrap';
    this.dom.style.pointerEvents = 'none';
    this.dom.style.opacity = '0.5';
    this.dom.style.zIndex = '9999';

    document.body.appendChild(this.dom);
  }

  update() {
    this.dom.textContent = `[memory]
${Object.keys(this.renderer.info.memory)
  .map(key => `${key}: ${this.renderer.info.memory[key]}`)
  .join('\n')}
[render]
${Object.keys(this.renderer.info.render)
  .map(key => `${key}: ${this.renderer.info.render[key]}`)
  .join('\n')}`;
  }
}
