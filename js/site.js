// open menu
const openButton = document.querySelector(".open");
const closeButton = document.querySelector(".close");
const menu = document.querySelector(".menu");
openButton.onclick = function () {
  menu.style.display = "block";
  closeButton.style.display = "block";
};

// close menu
closeButton.onclick = function () {
  menu.style.display = "none";
  closeButton.style.display = "none";
};
