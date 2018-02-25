// document.getElementById("app").innerHTML = "whatev";

const containerDiv = document.getElementById("appContainer");
const zoomLevel = 2;

const pixiApp = new PIXI.Application({
  view: document.getElementById("mainCanvas"),
  width: containerDiv.offsetWidth,
  height: containerDiv.offsetHeight,
  antialias: true,
  resolution: zoomLevel,
  transparent: true
});
const stage = pixiApp.stage;
stage.interactive = true;

const state = {
  isDragging: false
};

const someText = new PIXI.Text("something");
someText.interactive = true;
someText.on("pointerdown", e => (state.isDragging = true));
someText.on("pointermove", e => {
  if (state.isDragging) {
    someText.x = e.data.global.x * zoomLevel - someText.getBounds().width;
    someText.y = e.data.global.y * zoomLevel;
  }
});
stage.on("pointerup", e => (state.isDragging = false));

pixiApp.stage.addChild(someText);
