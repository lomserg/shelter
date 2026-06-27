const modal = document.querySelector(".modal");

const modalClose = document.querySelector(".modal__close");

const modalImg = document.querySelector(".modal__img");

const modalTitle = document.querySelector(".modal__title");

const modalSubtitle = document.querySelector(".modal__subtitle");

const modalDescription = document.querySelector(".modal__description");

const modalList = document.querySelector(".modal__list");

let petsData = [];

fetch(
  location.pathname.includes("pets")
    ? "../assets/pets.json"
    : "./assets/pets.json",
)
  .then((res) => res.json())

  .then((data) => {
    petsData = data;
    console.log(petsData);
    initModal();
  });
function initModal() {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".pets__item");

    if (!card) return;

    let name = card
      .querySelector(".pets__title")
      .textContent.replace(/\s+/g, " ")
      .trim();

    let pet = petsData.find((item) => item.name === name);

    if (!pet) return;

    openModal(pet);
  });
}
function openModal(pet) {
  console.log(pet);
  modalImg.innerHTML = `

<img src="${pet.img}" alt="${pet.name}">

`;

  modalTitle.textContent = pet.name;

  modalSubtitle.textContent = `${pet.type} - ${pet.breed}`;

  modalDescription.textContent = pet.description;

  modalList.innerHTML = `


<li>
<strong>Age:</strong>
${pet.age}
</li>


<li>
<strong>Inoculations:</strong>
${pet.inoculations.join(", ")}
</li>


<li>
<strong>Diseases:</strong>
${pet.diseases.join(", ")}
</li>


<li>
<strong>Parasites:</strong>
${pet.parasites.join(", ")}
</li>


`;

  modal.classList.add("active");

  document.body.classList.add("no-scroll");
}

function closeModal() {
  modal.classList.remove("active");

  document.body.classList.remove("no-scroll");
}

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (!e.target.closest(".modal__wrapper")) {
    closeModal();
  }
});
