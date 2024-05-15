export function resizeElement(element, dimensions) {
  element.setAttribute("width", dimensions[0] + "px");
  element.setAttribute("height", dimensions[1] + "px");
}

export function resizeElementToWindow(element) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  resizeElement(element, [width, height]);
}
