export const canvas = document.getElementById("canvas-pen");
const pen = new Pen(canvas).setStrokeWidth(2).setFillStyle("#ccc");

const state = {
  penActive: false,
  penLastX: undefined,
  penLastY: undefined,
};

export function activatePen() {
  state.penActive = true;
}

export function deactivatePen() {
  state.penActive = false;
  state.penLastX = undefined;
  state.penLastY = undefined;
}

function adjustCoordsForPointer(x, y) {
  const pointerRadius = 5;

  return [x - pointerRadius, y - pointerRadius];
}

export function penDraw(event) {
  if (!state.penActive) return;

  // Get the mouse coordinates relative to the viewport
  const x = event.clientX;
  const y = event.clientY;

  if (state.penLastX !== "undefined" && state.penLastY !== "undefined") {
    pen
      .line(
        adjustCoordsForPointer(state.penLastX, state.penLastY),
        adjustCoordsForPointer(x, y),
      )
      .stroke();
  } else {
    pen.circle(adjustCoordsForPointer(x, y), 2).stroke();
  }

  state.penLastX = x;
  state.penLastY = y;
}

export function resetCanvas() {
  pen.clear();
}
