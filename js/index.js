//slideshow

const previous = document.querySelector(".previous");
const next = document.querySelector(".next");

const recentPosts = document.querySelector(".recent-posts-list");

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

    for (let i = 0; i < results.length; i++) {
      const repliesArray = results[i]._embedded.replies;

      let numReplies = 0;

      if (results[i]._embedded.replies) {
        for (let y = 0; y < results[i]._embedded.replies.length; y++) {
          numReplies = repliesArray[y].length;
        }
      }

      console.log(numReplies);
    }
  } catch (error) {
    console.log(error);
    // postWrapper.innerHTML = displayError(
    //   "An error has occured when trying to retrive the API"
    // );
  }
}

fetchPosts();
