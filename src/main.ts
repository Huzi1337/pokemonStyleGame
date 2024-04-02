import { Application, Assets, Renderer, Sprite } from "pixi.js";
import "./style.css";
import { LoadAssetConfig } from "./types";
import { MoveController } from "./player/MoveController";

const app = new Application();

async function setup() {
  await app.init({ resizeTo: window, background: "#CFEBD2" });
  document.body.appendChild(app.canvas);
}

async function preload() {
  const assets: LoadAssetConfig[] = [
    { alias: "player", src: "/player/player.png" },
  ];

  await Assets.load(assets);
}

function initializePlayer(app: Application<Renderer>) {
  const player = Sprite.from("player");

  app.stage.addChild(player);

  return player;
}

(async () => {
  await setup();
  await preload();
  const player = initializePlayer(app);
  const playerControl = new MoveController(player, app, { speed: 3 });
})();
