let lineWidth = 1;
window.onload = () => {
  data.innerHTML = lineWidth;
  canvCtx.lineWidth = lineWidth;
  canvCtx.strokeStyle = "#000000"; //defines the color
};
let canv = document.querySelector("#canv");
canvCtx = canv.getContext("2d");
canv.height = 800;
canv.width = document.body.clientWidth;
//we will draw on context and not on canvas
canvCtx.lineJoin = "round"; //defines what should be the shape when two lines meet
canvCtx.lineCap = "round"; //defines what should be the shape of the line at its corners
let lastX = 0; //last x position after something is drawn
let lastY = 0; // last y position after something is drawn
function decrease() {
  //this function will decrease the value of line width
  if (lineWidth == 1) return;
  else lineWidth--;
  data.innerHTML = lineWidth;
  canvCtx.lineWidth = lineWidth;
}

function increase() {
  //this function will increase the value of line width
  if (lineWidth == 50) return;
  else lineWidth++;
  data.innerHTML = lineWidth;
  canvCtx.lineWidth = lineWidth;
}

function changeColor() {
  let data = color.value;
  canvCtx.strokeStyle = data;
}
let isDraw = false; //used to check whether mouse is clicked or not
function draw(e) {
  if (isDraw) {
    canvCtx.beginPath();
    //start from
    canvCtx.moveTo(lastX, lastY);
    //go to
    canvCtx.lineTo(e.offsetX, e.offsetY);
    canvCtx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
}

function clearScreen() {
  //this is used to clear the canva
  canvCtx.clearRect(0, 0, canv.width, canv.height);
}

function saveImageFunc() {
  let downloadLink = document.createElement("a");
  downloadLink.setAttribute("download", "draw_it.png");
  let dataURL = canv.toDataURL("image/png");
  let url = dataURL.replace(
    /^data:image\/png/,
    "data:application/octet-stream"
  );
  downloadLink.setAttribute("href", url);
  downloadLink.click();
}

const dec = document.querySelector(".dec");
dec.addEventListener("click", decrease);
const inc = document.querySelector(".inc");
inc.addEventListener("click", increase);
const clear = document.querySelector(".clear");
clear.addEventListener("click", clearScreen);
const data = document.querySelector(".size");
const color = document.querySelector(".colorPicked");
color.addEventListener("change", changeColor);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", (e) => {
  if (e.target == drawArea) {
    isDraw = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
});
const drawArea = document.querySelector("#canv");
function changeWidth() {
  canv.width = document.body.clientWidth;
}
document.addEventListener("mouseup", () => (isDraw = false));
document.addEventListener("mouseout", () => (isDraw = false));
const image = document.querySelector(".saveImage");
image.addEventListener("click", saveImageFunc);
window.addEventListener("resize", changeWidth);
