const postWrapper = document.querySelector(".post-wrapper");

const embed = "?_embed";

const postsUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/posts/" + embed;

// const corsEnabledUrl = "https://noroffcors.herokuapp.com/" + postsUrl;

//console.log(postsUrl);

async function fetchPosts() {
  try {
    const response = await fetch(postsUrl);
    const results = await response.json();

    //console.log(results);

    postWrapper.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      // if (results[i].rt_score < 85) {
      //   continue;
      // }

      const mediaArray = results[i]._embedded["wp:featuredmedia"];

      //console.log(mediaArray);

      for (let i = 0; i < mediaArray.length; i++) {
        console.log(mediaArray[i].source_url);

        postWrapper.innerHTML += `
      <div class="post-container">
     <a href="specific_post.html?id=${results[i].id}">
     <figure class="post-image">
     <img class="post-image" src="${mediaArray[i].source_url}"/>
     </figure>
     <h4>${results[i].title.rendered}</h4>
     <div class="info-container">
     </div>
     <p class="post-text> ${results[i].status}</p>
     </a>
     <hr class="divider" />
     </div>`;
      }
    }
  } catch (error) {
    console.log(error);
    resultsContainer.innerHTML = displayError(
      "An error has occured when trying to retrive the API"
    );
  }
}

fetchPosts();
