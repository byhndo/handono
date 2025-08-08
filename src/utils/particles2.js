import anime from 'animejs/lib/anime.es.js';

export default class Particles {
  constructor(el, options = {}) {
    this.el = el instanceof HTMLElement ? el : document.querySelector(el);
    this.o = {
      type: 'triangle',
      style: 'stroke',
      size: 6,
      sizeFn: null,
      color: '#FFF',
      duration: 1000,
      easing: 'easeInOutSine',
      direction: 'alternate',
      particlesAmountCoefficient: 3,
      oscillationCoefficient: 2,
      ...options
    };

    this.initCanvas();
    this.init();
  }

  initCanvas() {
    this.parentWrapper = document.createElement('div');
    this.wrapper = document.createElement('div');
    this.canvas = document.createElement('canvas');

    this.parentWrapper.classList.add('particles-wrapper-parent');
    this.wrapper.classList.add('particles-wrapper');
    this.canvas.classList.add('particles-canvas');

    this.wrapper.appendChild(this.canvas);
    this.parentWrapper.appendChild(this.wrapper);
    this.el.parentNode.insertBefore(this.parentWrapper, this.el);
    this.wrapper.appendChild(this.el);

    this.ctx = this.canvas.getContext('2d');
  }

  init() {
    this.particles = [];
    this.frame = null;
    this.disintegrating = false;
    this.lastProgress = 0;

    this.setRect();
    this.setupCanvas();
    this.setupStyles();
  }

  setRect() {
    this.rect = this.el.getBoundingClientRect();
  }

  setupCanvas() {
    this.canvas.width = this.rect.width;
    this.canvas.height = this.rect.height;
  }

  setupStyles() {
    this.wrapper.style.position = 'relative';
    this.wrapper.style.display = 'inline-block';
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = 0;
    this.canvas.style.left = 0;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.el.style.visibility = 'hidden';
  }

  setup(options) {
    this.o = { ...this.o, ...options };
    this.setRect();
    this.setupCanvas();
    this.particles = [];
  }

  disintegrate(options = {}) {
    if (!this.isAnimating()) {
      this.disintegrating = true;
      this.lastProgress = 0;

      // 🧼 Cleanup before animation
      this.pause();
      this.particles = [];
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.setup(options);
      this.animate(anim => {
        const value = anim.animatables[0].target.value;
        this.addTransforms(value);
        if (this.o.duration) {
          this.addParticles(this.rect, value / 100);
        }
      });
    }
  }

  integrate(options = {}) {
    if (!this.isAnimating()) {
      this.disintegrating = false;
      this.lastProgress = 1;

      // 🧼 Cleanup before animation
      this.pause();
      this.particles = [];
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.setup(options);
      this.animate(anim => {
        const value = anim.animatables[0].target.value;
        setTimeout(() => this.addTransforms(value), this.o.duration);
        if (this.o.duration) {
          this.addParticles(this.rect, value / 100);
        }
      });
    }
  }

  addParticles(rect, progressDiff) {
    const amount = rect.width * rect.height / (this.o.size * this.o.size) * progressDiff;
    for (let i = 0; i < amount; i++) {
      this.particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: typeof this.o.sizeFn === 'function' ? this.o.sizeFn() : this.o.size,
        dx: (Math.random() - 0.5) * this.o.oscillationCoefficient,
        dy: (Math.random() - 0.5) * this.o.oscillationCoefficient,
        opacity: 1
      });
    }
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      this.ctx.globalAlpha = p.opacity;
      this.ctx.beginPath();
      if (this.o.type === 'circle') {
        this.ctx.arc(p.x, p.y, p.size / 2, 0, 2 * Math.PI);
      } else {
        this.ctx.rect(p.x, p.y, p.size, p.size);
      }

      if (this.o.style === 'fill') {
        this.ctx.fillStyle = this.o.color;
        this.ctx.fill();
      } else {
        this.ctx.strokeStyle = this.o.color;
        this.ctx.stroke();
      }

      p.x += p.dx;
      p.y += p.dy;
      p.opacity *= 0.96;
    });
    this.ctx.globalAlpha = 1;
  }

  animate(draw) {
    const settings = {
      targets: { value: this.disintegrating ? 0 : 100 },
      value: this.disintegrating ? 100 : 0,
      duration: this.o.duration,
      easing: this.o.easing,
      direction: this.o.direction,
      update: anim => draw(anim),
      complete: () => this.pause()
    };
    this.pause(); // stop previous animation loop
    anime(settings);
    this.frame = requestAnimationFrame(this.render.bind(this));
  }

  render() {
    this.drawParticles();
    if (this.particles.length > 0) {
      this.frame = requestAnimationFrame(this.render.bind(this));
    } else {
      this.pause();
    }
  }

  pause() {
    if (this.frame) {
      cancelAnimationFrame(this.frame);
      this.frame = null;
    }
  }

  isAnimating() {
    return this.frame !== null;
  }

  addTransforms(value) {
    this.el.style.transform = `translateY(${(this.disintegrating ? 1 - value / 100 : value / 100) * -10}px)`;
  }

  destroy() {
    this.pause();
    this.particles = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.remove();
    this.wrapper.remove();
    this.parentWrapper.remove();
  }
}
