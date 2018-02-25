const containerDiv = document.getElementById("appContainer");
const zoomLevel = 4;
const canvasWidth = containerDiv.offsetWidth;
const canvasHeight = containerDiv.offsetHeight;
const screenCenter = {
  x: canvasWidth / (2 * zoomLevel),
  y: canvasHeight / (2 * zoomLevel)
};
const config = {
  radius: 20,
  maxValue: 20,
  minValue: 0
};
const modelState = {
  minValue: 0,
  maxValue: 10,
  updatingField: false
};

const pixiApp = new PIXI.Application({
  view: document.getElementById("mainCanvas"),
  width: canvasWidth,
  height: canvasHeight,
  antialias: true,
  resolution: zoomLevel,
  transparent: true
});
const stage = pixiApp.stage;
stage.interactive = true;

const degreeToRadians = degrees => degrees * Math.PI / 180;
const radiansToDegree = radians => radians * 180 / Math.PI;

const valueToRadian = val => {
  const center = screenCenter;
  const { radius, maxValue, minValue } = config;
  const fullRange = maxValue - minValue;
  const degreeAngle = (val - minValue) / fullRange * 360 - 90;
  const radiansAngle = degreeToRadians(degreeAngle);
  return radiansAngle;
};

const valueToPosition = val => {
  const { radius } = config;
  const radiansAngle = valueToRadian(val);
  const sin = Math.sin(radiansAngle);
  const cos = Math.cos(radiansAngle);
  const position = {
    x: screenCenter.x + cos * radius,
    y: screenCenter.y + sin * radius
  };
  return position;
};

const positionToValue = ({ x, y }) => {
  const deltaX = x - screenCenter.x;
  const deltaY = y - screenCenter.y;
  const diag = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  const radians = Math.asin(deltaY / diag);
  const degreeAngle = radiansToDegree(radians) + 90;
  const value =
    degreeAngle / 360 * (config.maxValue - config.minValue) + config.minValue;
  return deltaX >= 0 ? value : -value;
};

const createScrubber = ({ stateModelKey }) => {
  const sprite = new PIXI.Graphics().beginFill("0").drawCircle(0, 0, 5);
  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.on("pointerdown", e => (modelState.updatingField = stateModelKey));
  stage.on("pointermove", e => {
    if (modelState.updatingField === stateModelKey) {
      modelState[stateModelKey] = positionToValue(e.data.global);
    }
  });
  stage.on("pointerup", e => (modelState.updatingField = null));
  return sprite;
};

const createArch = ({
  color = 0,
  thickness = 5,
  reverse = false,
  opacity = 1
}) => {
  const archGraphics = new PIXI.Graphics();
  archGraphics.render = () => {
    archGraphics
      .clear()
      .lineStyle(thickness, color, opacity)
      .arc(
        0,
        0,
        config.radius,
        reverse
          ? valueToRadian(modelState.maxValue)
          : valueToRadian(modelState.minValue),
        reverse
          ? valueToRadian(modelState.minValue)
          : valueToRadian(modelState.maxValue)
      );
  };
  archGraphics.x = screenCenter.x;
  archGraphics.y = screenCenter.y;
  return archGraphics;
};

const arch = createArch({});
const reverseArc = createArch({ reverse: true, color: 0, opacity: 0.5 });
const minCircleSprite = createScrubber({ stateModelKey: "minValue" });
const maxCircleSprite = createScrubber({ stateModelKey: "maxValue" });

stage.addChild(arch);
stage.addChild(reverseArc);
stage.addChild(minCircleSprite);
stage.addChild(maxCircleSprite);

// main animation loop
pixiApp.ticker.add(() => {
  minCircleSprite.x = valueToPosition(modelState.minValue).x;
  minCircleSprite.y = valueToPosition(modelState.minValue).y;
  maxCircleSprite.x = valueToPosition(modelState.maxValue).x;
  maxCircleSprite.y = valueToPosition(modelState.maxValue).y;
  arch.render();
  reverseArc.render();
});
