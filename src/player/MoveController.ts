import { Application, Sprite } from "pixi.js";

type Options = {
  speed: number;
};

export class MoveController {
  private moveVector = { x: 0, y: 0 };
  private lastHeldKey = "";

  constructor(
    private sprite: Sprite,
    private app: Application,
    private options: Options
  ) {
    this.setUpControls();
    this.startAnimate();
  }

  private setUpControls() {
    window.addEventListener("keydown", ({ key, repeat }) => {
      key = key.toUpperCase();
      //lastHeldKey check needed for chromium based browsers
      if (!repeat && this.lastHeldKey != key) {
        this.lastHeldKey = key;
        this.keyEventHandler(key, 1);
      }
    });
    window.addEventListener("keyup", ({ key }) => {
      key = key.toUpperCase();
      if (key === this.lastHeldKey) this.lastHeldKey = "";
      this.keyEventHandler(key, -1);
    });
  }

  private keyEventHandler(key: string, rightUpVector: number) {
    switch (key.toUpperCase()) {
      case "A":
        this.augmentSpeedX(-rightUpVector);
        break;
      case "D":
        this.augmentSpeedX(rightUpVector);
        break;
      case "W":
        this.augmentSpeedY(-rightUpVector);
        break;
      case "S":
        this.augmentSpeedY(rightUpVector);
        break;
    }
  }

  private augmentSpeedY(value: number) {
    this.moveVector.y += value * this.options.speed;
  }
  private augmentSpeedX(value: number) {
    this.moveVector.x += value * this.options.speed;
  }
  startAnimate() {
    this.app.ticker.add(({ deltaTime }) => this.animate(deltaTime));
  }

  stopAnimate() {
    this.app.ticker.remove(({ deltaTime }) => this.animate(deltaTime));
  }

  private animate(deltaTime: number) {
    const { x, y } = this.moveVector;
    const { speed } = this.options;
    this.sprite.x += x * deltaTime * speed;
    this.sprite.y += y * deltaTime * speed;
  }
}
