//fetch specific post
const currentBreadcrumb = document.querySelector(".current");
const postContainer = document.querySelector(".post-container");
const postImage = document.querySelector(".post-image");
const postHeading = document.querySelector("h2");
const contentText = document.querySelector(".post-text");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

console.log(queryString);

const id = params.get("id");

const embed = "?_embed";

specificPostUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/posts/" + id + embed;

// const corsFix = "https://noroffcors.herokuapp.com/" + specificPostUrl;

console.log(specificPostUrl);

async function fetchSpecific() {
  try {
    const response = await fetch(specificPostUrl);
    const details = await response.json();

    console.log(details);

    ////console.log(details._embedded["wp:featuredmedia"]["0"].source_url);

    document.title = `Passionate Photography | ${details.title.rendered}`;

    //console.log(details.categories[0]);

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
  let category = details.categories[0];
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

  replies = details._embedded.replies;

  let numReplies = 0;

  if (replies) {
    numReplies = replies[0].length;
  }

  console.log(numReplies);

  currentBreadcrumb.innerHTML = `${details.title.rendered}`;

  postContainer.innerHTML = `
  <figure class="post-image">
     <img class="post-image" src="${details._embedded["wp:featuredmedia"]["0"].source_url}"/>
     </figure>
     <h2>${details.title.rendered}</h2>
     <div class="info-container">
      <p>${categoryName}</p>
     <p>/</p>
     <p>${details.formatted_date}</p>
     <p>/</p>
     <p>${numReplies} comments</p>
     </div>
     <div class="post-text">${details.content.rendered}</div>
 `;
}

//fetch comments
const commentWrapper = document.querySelector(".comment-wrapper");

const commentUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/comments?post=" + id;

console.log(commentUrl);

async function fetchComments() {
  try {
    const response = await fetch(commentUrl);
    const comments = await response.json();

    console.log(comments);

    commentWrapper.innerHTML = "";

    for (let i = 0; i < comments.length; i++) {
      //console.log(comments[i]);

      //console.log(comments[i].author_avatar_urls[96]);

      commentWrapper.innerHTML += `
       <div class="comment-container">
       <figure class="comment-image"><img class="comment-image" src="${comments[i].author_avatar_urls[96]}"/> </figure>
       <div>
       <div class="info-container"> </div>
       <h4>${comments[i].author_name}</h4>
       <div class="info-container"><p>${comments[i].date}</p></div>
       <div class="comment-text">${comments[i].content.rendered} </div>
       </div>
       </div> `;
    }
  } catch (error) {
    console.log(error);
    postContainer.innerHTML = displayError(
      "An error has occured when trying to retrive the API"
    );
  }
}

fetchComments();
