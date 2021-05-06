//fetch specific post
const currentBreadcrumb = document.querySelector(".current");
const postContainer = document.querySelector(".post-container");
const postImage = document.querySelector(".post-image");
const postHeading = document.querySelector("h2");
const contentText = document.querySelector(".post-text");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const embed = "?_embed";

console.log(queryString);

const id = params.get("id");

specificPostUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/posts/" + id + embed;

// const corsFix = "https://noroffcors.herokuapp.com/" + specificPostUrl;

console.log(specificPostUrl);

async function fetchSpecific() {
  try {
    const response = await fetch(specificPostUrl);
    const details = await response.json();

    console.log(details);

    console.log(details._embedded["wp:featuredmedia"]["0"].source_url);

    document.title = `Passionate Photography | ${details.title.rendered}`;

    createHtml(details);
  } catch (error) {
    console.log(error);
    postContainer.innerHTML = displayError(
      "An error has occured when trying to retrive the API"
    );
  }
}

fetchSpecific();

function createHtml(details) {
  currentBreadcrumb.innerHTML = `${details.title.rendered}`;
  postImage.innerHTML = `<img class="post-image" src="${details._embedded["wp:featuredmedia"]["0"].source_url}"/>`;
  postHeading.innerHTML = `${details.title.rendered}`;
  contentText.innerHTML = `${details.content.rendered}`;
}
