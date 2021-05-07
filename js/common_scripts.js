//mobile dropdown menu

const hamburgerMenu = document.querySelector("#hamburger-menu");
const mobileMenu = document.querySelector(".mobile-menu");

function mobileMenuDropdown() {
  if (mobileMenu.style.display === "flex") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "flex";
  }
}

hamburgerMenu.addEventListener("click", mobileMenuDropdown);

//newsletter

const newsletterForm = document.querySelector("#newsletter-form");
const subscribeMessage = document.querySelector(".subscribe-message");
const subscribeButton = document.querySelector("#subscribe-button");
const newsletterEmail = document.querySelector("#newsletter-email");
const emailError = document.querySelector("#email-error");

function checkInput() {
  if (validateEmail(newsletterEmail.value)) {
    emailError.style.visibility = "hidden";
  }
}

newsletterEmail.addEventListener("keyup", checkInput);

function validateForm(event) {
  event.preventDefault();

  if (validateEmail(newsletterEmail.value)) {
    emailError.style.visibility = "hidden";
  } else {
    emailError.style.visibility = "visible";
  }
  if (validateEmail(newsletterEmail.value)) {
    subscribeMessage.innerHTML = `<p id="subscribe-message">Welcome! Please check your inbox</p>`;
    //newsletterForm.reset();
  }
}

newsletterForm.addEventListener("submit", validateForm);

function validateEmail(newsletterEmail) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(newsletterEmail);
  return patternMatches;
}

//aside
const recentPosts = document.querySelector(".recent-posts-list");

const recentPostsUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/posts/";

// const corsEnabledUrl = "https://noroffcors.herokuapp.com/" + postsUrl;

//console.log(postsUrl);

async function fetchPosts() {
  try {
    const response = await fetch(recentPostsUrl);
    const results = await response.json();

    console.log(results);

    recentPosts.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      if (i >= 4) {
        break;
      }
      recentPosts.innerHTML += `
      <li><a href="specific_post.html?id=${results[i].id}">${results[i].title.rendered}</a></li>
      `;
    }
  } catch (error) {
    console.log(error);
    resultsContainer.innerHTML = displayError(
      "An error has occured when trying to retrive the API"
    );
  }
}

fetchPosts();
