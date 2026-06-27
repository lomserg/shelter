const burger = document.querySelector(".header__burger");
const navMenu = document.querySelector(".header__navcontainer");
const navItems = document.querySelectorAll(".header__navitem");
const background = document.querySelector(".header__background");
const body = document.querySelector("body");
console.log(background);
function closeMenu() {
  background.classList.remove("active");
  burger.classList.remove("is-active");
  navMenu.classList.remove("header__navcontainer-open");
  body.classList.remove("no-scroll");
}

burger.addEventListener("click", () => {
  background.classList.toggle("active");
  burger.classList.toggle("is-active");
  navMenu.classList.toggle("header__navcontainer-open");
  body.classList.toggle("no-scroll");
});

navItems.forEach((item) => {
  item.addEventListener("click", closeMenu);
});

background.addEventListener("click", closeMenu);
