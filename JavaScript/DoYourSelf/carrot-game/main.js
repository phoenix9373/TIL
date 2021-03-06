const app = document.querySelector(".app");
const appWidth = app.offsetWidth;
const appHeight = app.offsetHeight;

// info
const count = document.querySelector(".info__count");

// img
const bug = document.querySelector(".bug");
const carrot = document.querySelector(".carrot");

// random : 최소, 최대 값 사이의 int 값을 반환.
function randomValue(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

bug.style.top = `${randomValue(appHeight / 2, appHeight - bug.offsetHeight)}px`;
bug.style.left = `${randomValue(0, appWidth - bug.offsetWidth)}px`;
carrot.style.top = `${randomValue(
  appHeight / 2,
  appHeight - carrot.offsetHeight
)}px`;
carrot.style.left = `${randomValue(0, appWidth - carrot.offsetWidth)}px`;
