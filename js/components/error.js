function displayError(message = "Unknown error") {
  return `<div class="error">${message}</div>`;
}


// function openModal(event) {
//   if (event.target.matches(".post-image")) {
//     modal.style.display = "block";
//     modalImage.src = `${details._embedded["wp:featuredmedia"]["0"].source_url}`;
//     captionText.innerHTML = `${details._embedded["wp:featuredmedia"]["0"].caption.rendered}`;
//     console.log(event.target.matches(".post-image"));
//     modal.style.pointerEvents = "none";
//   }
// }

// document.addEventListener("click", openModal);