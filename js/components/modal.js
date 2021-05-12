//modal

const modal = document.querySelector(".modal-container");

const img = document.querySelector(".post-image");
const modalImage = document.querySelector("#img01");
const captionText = document.querySelector("#caption");

console.log(name);

img.onclick = function () {
  modal.style.display = "block";
  modalImage.src = this.src;
  captionText.innerHTML = this.alt;
};

const span = document.getElementsByClassName("close"[0]);

span.onclick = function () {
  modal.style.display = "none";
};
