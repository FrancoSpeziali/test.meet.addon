import { resizeElementToWindow } from "./lib.js";
import {
  canvas,
  penDraw,
  activatePen,
  deactivatePen,
  resetCanvas,
} from "./canvas.js";

const resetButton = document.getElementById("reset-button");

function init() {
  document.addEventListener("mousemove", penDraw);
  document.addEventListener("mousedown", activatePen);
  document.addEventListener("mouseup", deactivatePen);

  resetButton.addEventListener("mousedown", resetCanvas);

  addEventListener("resize", (event) => resizeElementToWindow(canvas));

  resizeElementToWindow(canvas);
}

init();
