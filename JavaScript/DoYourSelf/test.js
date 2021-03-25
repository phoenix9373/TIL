function getTextWidth(text, font) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  context.font = font || getComputedStyle(document.body).font;

  console.log(context.font);

  return context.measureText(text).width;
}

const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

elements.forEach((element) => {
  console.log(element);
  console.log(getTextWidth(element.innerText, getComputedStyle(element).font));
});
