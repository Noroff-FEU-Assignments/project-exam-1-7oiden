const postWrapper = document.querySelector(".post-wrapper");

const postsUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/posts/";

// const corsEnabledUrl = "https://noroffcors.herokuapp.com/" + postsUrl;

console.log("hi");

console.log(postsUrl);

async function fetchPosts() {
  try {
    const response = await fetch(postsUrl);
    const results = await response.json();

    console.log(results);

    postWrapper.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      // if (results[i].rt_score < 85) {
      //   continue;
      // }

      console.log(results[i].slug);

      postWrapper.innerHTML += `
      <div class="post-container">
     <a href="specific_post.html?id=${results[i].id}"
     <figure class="post-image">
     <img class="post-image src="images/asian_street-720-crop.jpg"/> 
     </figure>
     <h4>${results[i].slug}</h4>
     <div class="info-container">
     </div>
     <p class="post-text> ${results[i].status}</p>
     </a>
     <hr class="divider" />
     </div>`;
    }
  } catch (error) {
    console.log(error);
    resultsContainer.innerHTML = displayError(
      "An error has occured when trying to retrive the API"
    );
  }
}

fetchPosts();
