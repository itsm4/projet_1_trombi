import person from "./data.js"
import elements from "./elements.js";
import { updateStackIcon, updateArrowsVisibility } from "./utils.js";
import { state } from "./variables.js";

const updateCard = (person) => {
  elements.cardImage.src = person.img;
  elements.pDescription.textContent = person.description;
  elements.citation.textContent = person.quote;
  elements.wilderName.textContent = person.name;
  elements.wilderAge.textContent = person.age;
  updateStackIcon(elements, person, person.isPerfect ? "black" : "white");
  elements.iconGenre.src = person.gender;
  elements.htmlBar.style.width = `${person.levelHtml}%`;
  elements.cssBar.style.width = `${person.levelCss}%`;
  elements.jsBar.style.width = `${person.levelJs}%`;

  updateCardStyle(person);
};

const updateCardStyle = (person) => {
  const resetStyle = () => {
    elements.card.style.boxShadow = "";
    elements.cardHeader.style.background = "";
    elements.cardDetails.style.background = "";
    elements.cardNoHeader.style.background = "";
    elements.cardNoHeader.style.border = "";
    elements.cardHeader.style.boxShadow = "";
    elements.cardNoHeader.style.boxShadow = "";
    elements.card.style.color = "#ffffff";
  };

  resetStyle();

  if (person.isPerfect) {
    const gradientBackground = "linear-gradient(45deg, rgba(255,247,171,1) 0%, rgba(211,215,254,1) 25%, rgba(196,245,255,1) 50%, rgba(236,255,212,1) 75%, rgba(248,201,255,1) 100%)";
    elements.cardHeader.style.background = gradientBackground;
    elements.cardDetails.style.background = gradientBackground;
    elements.cardNoHeader.style.background = gradientBackground;
    elements.cardNoHeader.style.border = "none";
    elements.cardHeader.style.boxShadow = "0px 0px 15px 10px #FFF8B7";
    elements.cardNoHeader.style.boxShadow = "0px 0px 15px 10px #FFF8B7";
    elements.card.style.color = "#000000";
  } else {
    const colors = {
      Html: ["#C76048", "#E7916B"],
      Css: ["#2958BB", "#759BEE"],
      Js: ["#D5AB3C", "#F7D137"]
    };
    const [headerColor, bodyColor] = colors[person.stack];
    elements.cardHeader.style.backgroundColor = headerColor;
    elements.cardDetails.style.backgroundColor = headerColor;
    elements.cardNoHeader.style.backgroundColor = bodyColor;
    elements.cardNoHeader.style.border = `4px solid ${headerColor}`;
  }
};

person.forEach((element, index) => {
  const image = document.createElement("img");
  elements.grid.appendChild(image);
  image.src = element.avatar;

  image.addEventListener("click", () => {
    state.actualIndex = index;
    updateArrowsVisibility(elements, state.actualIndex, person.length);
    elements.blurBackground.classList.add("blur-background-active");
    elements.blurBackground.classList.remove("blur-background");
    elements.card.classList.add("wilder-card-active");
    elements.card.classList.remove("wilder-card");
    updateCard(element);
  });
});

elements.leftArrow.addEventListener("click", () => {
  if (state.actualIndex > 0) {
    state.actualIndex--;
    updateCard(person[state.actualIndex]);
    updateArrowsVisibility(elements, state.actualIndex, person.length);
  }
});

elements.rightArrow.addEventListener("click", () => {
  if (state.actualIndex < person.length - 1) {
    state.actualIndex++;
    updateCard(person[state.actualIndex]);
    updateArrowsVisibility(elements, state.actualIndex, person.length);
  }
});

elements.close.addEventListener("click", () => {
  elements.card.classList.remove("wilder-card-active");
  elements.card.classList.add("wilder-card");
  elements.blurBackground.classList.add("blur-background");
  elements.blurBackground.classList.remove("blur-background-active");
});

updateArrowsVisibility(elements, state.actualIndex, person.length);
