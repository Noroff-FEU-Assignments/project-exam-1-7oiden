const postWrapper = document.querySelector(".post-wrapper");
const featureWrapper = document.querySelector(".feature-wrapper");

const embed = "?_embed";
const perPage = "&per_page=15";
const order = "&orderby=date";

const postsUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/posts/" +
  embed +
  perPage +
  order;

const corsFixUrl = "https://noroffcors.herokuapp.com/" + postsUrl;

//console.log(postsUrl);

async function fetchPosts() {
  try {
    const response = await fetch(corsFixUrl);
    const results = await response.json();

    console.log(results);

    postWrapper.innerHTML = "";

    if (document.title === "Passionate Photography | Home-page") {
      featureWrapper.innerHTML = "";
    }

    for (let i = 0; i < results.length; i++) {
      //fetch number of comments
      const repliesArray = results[i]._embedded.replies;

      let numReplies = 0;

      if (repliesArray) {
        for (let y = 0; y < repliesArray.length; y++) {
          numReplies = repliesArray[y].length;
        }
      }

      //console.log(numReplies);

      //console.log(category);

      const categoriesArray = results[i].categories;

      let categoryName;
      let category = results[i].categories[0];

      if (categoriesArray.length === 0) {
        categoryName = "Unspecified";
        //console.log(categoryName);
      } else {
        switch (category) {
          case 6:
            categoryName = "Cityscape";
            break;
          case 5:
            categoryName = "Black & white";
            break;
          case 4:
            categoryName = "Portrait";
            break;
          case 3:
            categoryName = "Landscape";
            break;
          case 2:
            categoryName = "Street";
            break;
          case 1:
            categoryName = "Uncategorized";
            break;
        }
      }

      const mediaArray = results[i]._embedded["wp:featuredmedia"];

      for (let j = 0; j < mediaArray.length; j++) {
        if (i >= 8 && document.title === "Passionate Photography | Home-page") {
          break;
        }
        postWrapper.innerHTML += `
    <div class="post-container" id="gradient-border">
     <a href="specific_post.html?id=${results[i].id}">
     <figure class="post-image">
     <img class="post-image" src="${mediaArray[j].source_url}"/>
     </figure>
     <h4>${results[i].title.rendered}</h4>
     <div class="info-container">
     <p class="info">${categoryName}</p>
     <p class="info">${results[i].formatted_date}</p>
     <p>${numReplies} comments</p>
     </div>
     <div class="post-text">${results[i].content.rendered}</div>
     </a>
     </div>
     `;
      }

      if (
        results[i].tags.length >= 2 &&
        document.title === "Passionate Photography | Home-page"
      ) {
        featureWrapper.innerHTML += `
     <div class="feature-container">
     <a href="specific_post.html?id=${results[i].id}">
     <figure class="feature-image">
     <img class="feature-image" src="${mediaArray[0].source_url}"/>
     </figure>
     <h4 id="featured-header">${results[i].title.rendered}</h4>
     <div class="info-container">
     <p class="info">${categoryName}</p>
     <p class="info">${results[i].formatted_date}</p>
     <p>${numReplies} comments</p>
     </div>
     <div class="feature-text">${results[i].content.rendered}</div>
     </a>
     </div>`;
      }
    }
  } catch (error) {
    console.log(error);
    postWrapper.innerHTML = displayError(
      "An error has occured when trying to retrive the API"
    );
  }
}

fetchPosts();

//load more button

const postLoader = document.querySelector("#load-button");

let currentPosts = 10;

if (document.title !== "Passionate Photography | Home-page") {
  function loadMorePosts(event) {
    const postList = [
      ...document.querySelectorAll(".post-wrapper .post-container"),
    ];

    for (let u = currentPosts; u < currentPosts + 2; u++) {
      if (postList[u]) {
        postList[u].style.display = "block";
      }
    }

    currentPosts += 2;

    if (currentPosts >= postList.length) {
      event.target.style.display = "none";
    }
  }

  postLoader.addEventListener("click", loadMorePosts);
}
