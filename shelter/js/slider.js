let data = [];

fetch("./assets/pets.json")
  .then((response) => response.json())

  .then((json) => {
    data = json;

    initSlider();
  });
const btnSliderLeft = document.querySelector("#slider__btn-left");
const btnSliderRight = document.querySelector("#slider__btn-right");

const petsCarousel = document.querySelector("#pets__slider");

const itemLeft = document.querySelector(".pets__group1");
const itemCenter = document.querySelector(".pets__group2");
const itemRight = document.querySelector(".pets__group3");

let item = 3;
let isMoving = false;

function itemSize() {
  if (window.innerWidth > 1120) {
    item = 3;
  } else if (window.innerWidth > 639) {
    item = 2;
  } else {
    item = 1;
  }
}

function getRandomPets(exclude = []) {
  let ids = data
    .map((_, index) => index)
    .filter((index) => !exclude.includes(index));

  ids.sort(() => Math.random() - 0.5);

  return ids.slice(0, item);
}

function createPet(id) {
  const pet = data[id];

  return `

<div class="pets__item">


<div class="pets__pic">

<img 
src="${pet.img}" 
alt="${pet.name}">

</div>



<div class="pets__content">


<div class="pets__label">


<h3 class="pets__title">

${pet.name}

</h3>



<button class="pets__btn button">

Learn more

</button>


</div>


</div>


</div>

`;
}

function render(group, arr) {
  group.innerHTML = "";

  arr.forEach((id) => {
    group.insertAdjacentHTML("beforeend", createPet(id));
  });
}

function initSlider() {
  itemSize();

  let center = getRandomPets([]);

  let left = getRandomPets(center);

  let right = getRandomPets([...center, ...left]);

  render(itemLeft, left);
  render(itemCenter, center);
  render(itemRight, right);
}

initSlider();

function getCurrent() {
  return [...itemCenter.children].map((card) => {
    let name = card.querySelector(".pets__title").textContent;

    return data.findIndex((pet) => pet.title === name);
  });
}

function moveRight() {
  if (isMoving) return;

  isMoving = true;

  let current = getCurrent();

  let next = getRandomPets(current);

  render(itemRight, next);

  petsCarousel.classList.add("transition-right");

  petsCarousel.addEventListener(
    "animationend",
    () => {
      petsCarousel.classList.remove("transition-right");

      itemLeft.innerHTML = itemCenter.innerHTML;

      itemCenter.innerHTML = itemRight.innerHTML;

      render(itemRight, getRandomPets([...current, ...next]));

      isMoving = false;
    },
    { once: true },
  );
}

function moveLeft() {
  if (isMoving) return;

  isMoving = true;

  let current = getCurrent();

  let prev = getRandomPets(current);

  render(itemLeft, prev);

  petsCarousel.classList.add("transition-left");

  petsCarousel.addEventListener(
    "animationend",
    () => {
      petsCarousel.classList.remove("transition-left");

      itemRight.innerHTML = itemCenter.innerHTML;

      itemCenter.innerHTML = itemLeft.innerHTML;

      render(itemLeft, getRandomPets([...current, ...prev]));

      isMoving = false;
    },
    { once: true },
  );
}

btnSliderRight.addEventListener("click", moveRight);

btnSliderLeft.addEventListener("click", moveLeft);

window.addEventListener("resize", () => {
  let old = item;

  itemSize();

  if (old !== item) {
    initSlider();
  }
});
