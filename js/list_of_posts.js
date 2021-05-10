const postWrapper = document.querySelector(".post-wrapper");
const featureWrapper = document.querySelector(".feature-wrapper");

const embed = "?_embed";

const perPage = "&per_page=12";

const postsUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/posts/" +
  embed +
  perPage;

// const corsEnabledUrl = "https://noroffcors.herokuapp.com/" + postsUrl;

//console.log(postsUrl);

async function fetchPosts() {
  try {
    const response = await fetch(postsUrl);
    const results = await response.json();

    console.log(results);

    postWrapper.innerHTML = "";
    featureWrapper.innerHTML = "";

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

      //console.log(mediaArray);

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
        postWrapper.innerHTML += `
      <div class="post-container">
     <a href="specific_post.html?id=${results[i].id}">
     <figure class="post-image">
     <img class="post-image" src="${mediaArray[j].source_url}"/>
     </figure>
     <h4>${results[i].title.rendered}</h4>
     <div class="info-container">
     <p>${categoryName}</p>
     <p>/</p>
     <p>${results[i].formatted_date}</p>
     <p>/</p>
     <p>${numReplies} comments</p>
     </div>
     <div class="post-text">${results[i].content.rendered}</div>
     </a>
     <hr id="post-divider"/>
     </div>
     `;

        if (results[i].tags.length > 1 && document.title === "home-page") {
          // if (i >= 4 && document.title === "home-page") {
          //   break;
          // }

          featureWrapper.innerHTML += `
      <div class="feature-container">
     <a href="specific_post.html?id=${results[i].id}">
     <figure class="feature-image">
     <img class="feature-image" src="${mediaArray[j].source_url}"/>
     </figure>
     <h4>${results[i].title.rendered}</h4>
     <div class="info-container">
     <p>${categoryName}</p>
     <p>/</p>
     <p>${results[i].formatted_date}</p>
     <p>/</p>
     <p>${numReplies} comments</p>
     </div>
     <div class="feature-text">${results[i].content.rendered}</div>
     </a>
     </div>`;
        }
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
// const postLoader = document.querySelector("#load-button");

// let currentPosts = 10;

// function loadMorePosts(event) {
//   const postList = [
//     ...document.querySelectorAll(".post-wrapper .post-container"),
//   ];

//   for (let u = currentPosts; u < currentPosts + 2; u++) {
//     if (postList[u]) {
//       postList[u].style.display = "block";
//     }
//   }

//   currentPosts += 2;

//   if (currentPosts >= postList.length) {
//     event.target.style.display = "none";
//   }
// }

// postLoader.addEventListener("click", loadMorePosts);
