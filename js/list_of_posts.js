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

    console.log(results);

    postWrapper.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      // if (results[i].rt_score < 85) {
      //   continue;
      // }

      //console.log(mediaArray);

      //console.log(category);
      let category = results[i].categories[0];
      let categoryName;

      switch (category) {
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
          categoryName = "Uknown";
          break;
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
     <p>${categoryName}
     <p>/</p>
     <p>${results[i].date}</p>
     </div>
     <div class="post-text">${results[i].content.rendered}</div>
     </a>
     <hr/>
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

//<img class="post-image" src="${mediaArray[i].source_url}" />;
