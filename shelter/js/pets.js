let data = [];

const petsContainer = document.querySelector(".pets__slider");

const btnFirst = document.querySelector(".first");

const btnPrev = document.querySelector(".prev");

const btnNext = document.querySelector(".next");

const btnLast = document.querySelector(".last");

const pageNumber = document.querySelector(".current");

let petsList = [];

let page = 1;

let cardsPerPage = 8;

let totalPages = 6;

// загрузка json

fetch("../assets/pets.json")
  .then((response) => response.json())

  .then((json) => {
    data = json;

    init();
  });

function init() {
  setCardsCount();

  petsList = create48Pets();

  renderPage();
}

// сколько карточек на странице

function setCardsCount() {
  if (window.innerWidth <= 639) {
    cardsPerPage = 3;

    totalPages = 16;
  } else if (window.innerWidth <= 1120) {
    cardsPerPage = 6;

    totalPages = 8;
  } else {
    cardsPerPage = 8;

    totalPages = 6;
  }
}

// создаём 48 карточек

function create48Pets() {
  let result = [];

  while (result.length < 48) {
    let randomPet = data[Math.floor(Math.random() * data.length)];

    let lastPet = result[result.length - 1];

    // нельзя два одинаковых подряд

    if (lastPet && lastPet.name === randomPet.name) {
      continue;
    }

    result.push(randomPet);
  }

  return result;
}

// карточка

function createCard(pet) {
  return `


<div class="pets__item">


<div class="pets__pic">

<img 
src="../assets/img/pets/${pet.img}"
alt="${pet.name}">

</div>



<div class="pets__content">


<h3 class="pets__title">

${pet.name}

</h3>



<button class="pets__btn button">

Learn more

</button>


</div>


</div>


`;
}

// вывод страницы

function renderPage() {
  petsContainer.classList.add("animation");

  setTimeout(() => {
    petsContainer.innerHTML = "";

    let start = (page - 1) * cardsPerPage;

    let end = start + cardsPerPage;

    petsList.slice(start, end).forEach((pet) => {
      petsContainer.insertAdjacentHTML(
        "beforeend",

        createCard(pet),
      );
    });

    pageNumber.textContent = page;

    updateButtons();

    petsContainer.classList.remove("animation");
  }, 300);
}

// кнопки

function updateButtons() {
  btnFirst.disabled = page === 1;

  btnPrev.disabled = page === 1;

  btnNext.disabled = page === totalPages;

  btnLast.disabled = page === totalPages;
}

btnFirst.addEventListener("click", () => {
  page = 1;

  renderPage();
});

btnPrev.addEventListener("click", () => {
  if (page > 1) {
    page--;

    renderPage();
  }
});

btnNext.addEventListener("click", () => {
  if (page < totalPages) {
    page++;

    renderPage();
  }
});

btnLast.addEventListener("click", () => {
  page = totalPages;

  renderPage();
});

window.addEventListener("resize", () => {
  let old = cardsPerPage;

  setCardsCount();

  if (old !== cardsPerPage) {
    page = 1;

    renderPage();
  }
});
