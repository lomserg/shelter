const data = [
  {
    title: "Katrine",
    subtitle: "Cat - British Shorthair",
    description:
      "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    list: {
      age: "6 months",
      inoculations: ["panleukopenia"],
      diseases: ["none"],
      parasites: ["none"],
    },
  },
  {
    title: "Jennifer",
    subtitle: "Dog - Labrador",
    description:
      "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    list: {
      age: "2 months",
      inoculations: ["none"],
      diseases: ["none"],
      parasites: ["none"],
    },
  },
  {
    title: "Woody",
    subtitle: "Dog - Golden Retriever",
    description:
      "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    list: {
      age: "3 years 6 months",
      inoculations: ["adenovirus", "distemper"],
      diseases: ["right back leg mobility reduced"],
      parasites: ["none"],
    },
  },
  {
    title: "Sophia",
    subtitle: "Dog - Shih tzu",
    description:
      "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    list: {
      age: "1 month",
      inoculations: ["parvovirus"],
      diseases: ["none"],
      parasites: ["none"],
    },
  },
  {
    title: "Timmy",
    subtitle: "Cat - British Shorthair",
    description:
      "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    list: {
      age: "2 years 3 months",
      inoculations: ["calicivirus", "viral rhinotracheitis"],
      diseases: ["kidney stones"],
      parasites: ["none"],
    },
  },
  {
    title: "Charly",
    subtitle: "Dog - Jack Russell Terrier",
    description:
      "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    list: {
      age: "8 years",
      inoculations: ["bordetella bronchiseptica", "leptospirosis"],
      diseases: ["deafness", "blindness"],
      parasites: ["lice", "fleas"],
    },
  },
  {
    title: "Scarlett",
    subtitle: "Dog - Jack Russell Terrier",
    description:
      "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    list: {
      age: "3 months",
      inoculations: ["parainfluenza"],
      diseases: ["none"],
      parasites: ["none"],
    },
  },
  {
    title: "Freddie",
    subtitle: "Cat - British Shorthair",
    description:
      "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    list: {
      age: "2 months",
      inoculations: ["rabies"],
      diseases: ["none"],
      parasites: ["none"],
    },
  },
];

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
  return `
<div class="pets__item">

<div class="pets__pic">
<img src="./assets/img/pets/${data[id].title.toLowerCase()}.png">
</div>


<div class="pets__content">

<div class="pets__label">

<h3 class="pets__title">
${data[id].title}
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
