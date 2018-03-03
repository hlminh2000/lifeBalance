const init = () => {
  const containerDiv = document.getElementById("appContainer");
  const zoomLevel = 1;
  const canvasWidth = containerDiv.offsetWidth * 2;
  const canvasHeight = containerDiv.offsetHeight * 2;
  const screenCenter = {
    x: canvasWidth / (2 * zoomLevel),
    y: canvasHeight / (2 * zoomLevel)
  };
  const config = {
    radius: window.radius || 200,
    maxValue: window.maxValue || 1440,
    minValue: window.minValue || 0,
    arcThickness: window.arcThickness || 60,
    arcColor: window.arcColor || 0x42deae,
    minValueInitial: window.minValueInitial || 0,
    maxValueInitial: window.maxValueInitial || 5,
    interval: window.interval || 100
  };
  const modelState = {
    minValue: config.minValueInitial,
    maxValue: config.maxValueInitial,
    updatingField: false
  };

  const dispatchPublicEvent = ({ message, payload }) => {
    window.postMessage(JSON.stringify({ message, payload }), "*");
    console.log(message, payload);
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
    const { maxValue, interval } = config;
    const deltaX = x - screenCenter.x;
    const deltaY = y - screenCenter.y;
    const diag = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    const radians = Math.asin(deltaY / diag);
    const degreeAngle = radiansToDegree(radians) + 90;
    const value =
      degreeAngle / 360 * (config.maxValue - config.minValue) + config.minValue;
    const roundToInterval = val => Math.round(val / interval) * interval;
    return roundToInterval(deltaX >= 0 ? value : maxValue - value);
  };

  const createScrubber = ({ stateModelKey, color = 0xffffff, radius = 5 }) => {
    const backDrop = new PIXI.Graphics()
      .beginFill(config.arcColor)
      .drawCircle(0, 0, radius);
    const sprite = new PIXI.Graphics()
      .beginFill(color)
      .drawCircle(0, 0, radius * 0.9);
    const hitArea = new PIXI.Graphics()
      .beginFill(color, 0)
      .drawCircle(0, 0, radius * 3);
    hitArea.interactive = true;
    hitArea.on("pointerdown", e => (modelState.updatingField = stateModelKey));
    stage.on("pointermove", e => {
      if (modelState.updatingField === stateModelKey) {
        modelState[stateModelKey] = positionToValue(e.data.global);
        dispatchPublicEvent({
          message: "VALUE_CHANGE",
          payload: {
            state: modelState
          }
        });
      }
    });
    stage.on("pointerup", e => (modelState.updatingField = null));
    backDrop.addChild(sprite);
    sprite.addChild(hitArea);
    sprite.interactive = true;
    sprite.buttonMode = true;
    return backDrop;
  };

  const createArch = ({
    color = 0,
    arcThickness = config.arcThickness,
    isStatic = false,
    opacity = 1
  }) => {
    const archGraphics = new PIXI.Graphics();
    archGraphics.render = () =>
      isStatic
        ? archGraphics
            .clear()
            .lineStyle(arcThickness, color, opacity)
            .drawCircle(0, 0, config.radius)
        : archGraphics
            .clear()
            .lineStyle(arcThickness, color, opacity)
            .arc(
              0,
              0,
              config.radius,
              valueToRadian(modelState.minValue),
              valueToRadian(modelState.maxValue)
            );
    archGraphics.x = screenCenter.x;
    archGraphics.y = screenCenter.y;
    return archGraphics;
  };

  const arch = createArch({ color: config.arcColor });
  const reverseArc = createArch({ isStatic: true, color: 0, opacity: 0.2 });
  const minCircleSprite = createScrubber({
    stateModelKey: "minValue",
    color: 0xffffff,
    radius: config.arcThickness / 2
  });
  const maxCircleSprite = createScrubber({
    stateModelKey: "maxValue",
    color: 0xffffff,
    radius: config.arcThickness / 2
  });

  stage.addChild(reverseArc);
  stage.addChild(arch);
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
};
