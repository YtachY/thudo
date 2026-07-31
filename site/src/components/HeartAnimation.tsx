"use client";

import { useEffect, useRef } from "react";

class Point {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  length(length?: number) {
    if (typeof length === "undefined") {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    this.normalize();
    this.x *= length;
    this.y *= length;
    return this;
  }

  normalize() {
    const length = this.length();
    this.x /= length;
    this.y /= length;
    return this;
  }
}

class Particle {
  position: Point;
  velocity: Point;
  acceleration: Point;
  age: number;

  constructor() {
    this.position = new Point();
    this.velocity = new Point();
    this.acceleration = new Point();
    this.age = 0;
  }

  initialize(x: number, y: number, dx: number, dy: number) {
    this.position.x = x;
    this.position.y = y;
    this.velocity.x = dx;
    this.velocity.y = dy;
    this.acceleration.x = dx * settings.particles.effect;
    this.acceleration.y = dy * settings.particles.effect;
    this.age = 0;
  }

  update(deltaTime: number) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += this.acceleration.y * deltaTime;
    this.age += deltaTime;
  }

  draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
    function ease(t: number) {
      return --t * t * t + 1;
    }
    const size = image.width * ease(this.age / settings.particles.duration);
    context.globalAlpha = 1 - this.age / settings.particles.duration;
    context.drawImage(
      image,
      this.position.x - size / 2,
      this.position.y - size / 2,
      size,
      size
    );
  }
}

interface ParticlePool {
  particles: Particle[];
  firstActive: number;
  firstFree: number;
  duration: number;
  add(x: number, y: number, dx: number, dy: number): void;
  update(deltaTime: number): void;
  draw(context: CanvasRenderingContext2D, image: HTMLImageElement): void;
}

function createParticlePool(length: number): ParticlePool {
  const particles: Particle[] = new Array(length);
  for (let i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
  }
  const firstActive = 0;
  const firstFree = 0;
  const duration = settings.particles.duration;

  const pool: ParticlePool = {
    particles,
    firstActive,
    firstFree,
    duration,
    add(x: number, y: number, dx: number, dy: number) {
      this.particles[this.firstFree].initialize(x, y, dx, dy);
      this.firstFree++;
      if (this.firstFree === this.particles.length) this.firstFree = 0;
      if (this.firstActive === this.firstFree) this.firstActive++;
      if (this.firstActive === this.particles.length) this.firstActive = 0;
    },
    update(deltaTime: number) {
      if (this.firstActive < this.firstFree) {
        for (let i = this.firstActive; i < this.firstFree; i++) {
          this.particles[i].update(deltaTime);
        }
      }
      if (this.firstFree < this.firstActive) {
        for (let i = this.firstActive; i < this.particles.length; i++) {
          this.particles[i].update(deltaTime);
        }
        for (let i = 0; i < this.firstFree; i++) {
          this.particles[i].update(deltaTime);
        }
      }
      while (
        this.particles[this.firstActive].age >= this.duration &&
        this.firstActive !== this.firstFree
      ) {
        this.firstActive++;
        if (this.firstActive === this.particles.length) this.firstActive = 0;
      }
    },
    draw(context: CanvasRenderingContext2D, image: HTMLImageElement) {
      if (this.firstActive < this.firstFree) {
        for (let i = this.firstActive; i < this.firstFree; i++) {
          this.particles[i].draw(context, image);
        }
      }
      if (this.firstFree < this.firstActive) {
        for (let i = this.firstActive; i < this.particles.length; i++) {
          this.particles[i].draw(context, image);
        }
        for (let i = 0; i < this.firstFree; i++) {
          this.particles[i].draw(context, image);
        }
      }
    },
  };
  return pool;
}

const settings = {
  particles: {
    length: 500,
    duration: 2,
    velocity: 100,
    effect: -0.75,
    size: 30,
  },
};

function pointOnHeart(t: number): Point {
  return new Point(
    160 * Math.pow(Math.sin(t), 3),
    130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
  );
}

export default function HeartAnimation({ colors }: { colors: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    function onResize() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    }

    const particleImage = (function () {
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d")!;
      c.width = settings.particles.size;
      c.height = settings.particles.size;

      function to(t: number) {
        const point = pointOnHeart(t);
        point.x = settings.particles.size / 2 + (point.x * settings.particles.size) / 350;
        point.y = settings.particles.size / 2 - (point.y * settings.particles.size) / 350;
        return point;
      }

      ctx.beginPath();
      let t = -Math.PI;
      let point = to(t);
      ctx.moveTo(point.x, point.y);
      while (t < Math.PI) {
        t += 0.01;
        point = to(t);
        ctx.lineTo(point.x, point.y);
      }
      ctx.closePath();

      const color = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillStyle = color;
      ctx.fill();

      const img = new Image();
      img.src = c.toDataURL();
      return img;
    })();

    let particles: ParticlePool | null = null;
    let particleRate = 0;
    let time: number | undefined;
    let raf = 0;

    function render(newTime: number) {
      raf = requestAnimationFrame(render);
      const deltaTime = ((newTime - (time || newTime)) / 1000) as number;
      time = newTime;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const amount = particleRate * deltaTime;
      for (let i = 0; i < amount; i++) {
        const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
        const dir = pos.clone().length(settings.particles.velocity);
        if (particles) {
          particles.add(
            canvas.width / 2 + pos.x,
            canvas.height / 2 - pos.y,
            dir.x,
            -dir.y
          );
        }
      }

      if (particles) {
        particles.update(deltaTime);
        particles.draw(context, particleImage);
      }
    }

    onResize();
    window.addEventListener("resize", onResize);
    particles = createParticlePool(settings.particles.length);
    particleRate = settings.particles.length / settings.particles.duration;
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [colors]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}
