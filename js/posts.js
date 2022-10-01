import { url } from "./config.js";

let postsCount = 0;
let page = 1;
let posts = [];
const postsContainer = document.querySelector(".posts-container");
const morePostsBtn = document.querySelector(".all-posts-cta button");
const loader = document.querySelector(".loader");

// loading posts
async function loadPosts() {
  try {
    let data = await fetch(`${url}/posts?per_page=10&page=${page}&_embed`);
    posts = await data.json();
    // remove loader after loading posts
    loader.style.display = "none";
    // add current total posts plus new posts
    postsCount = postsCount + posts.length;
    //send property headers from fetch to verify total posts nr
    verifyTotalPosts(data.headers);
    insertPosts();
  } catch (e) {
    // error catch
  }
}
loadPosts();

function insertPosts() {
  posts.forEach((post) => {
    // convert date
    const date = new Date(post.date);
    // insert post
    postsContainer.innerHTML =
      postsContainer.innerHTML +
      `<div class="post-box">
    <img src="${
      post["_embedded"]["wp:featuredmedia"][0].media_details.sizes.full
        .source_url
    }" alt="${post.title.rendered}" />
    <p class="date-post">${date.toLocaleDateString("no")}</p>
    <h2 class="post-title">${post.title.rendered}</h2>
    ${posts[0].excerpt.rendered}
    <div class="post-cta-container">
        <a href="single.html?id=${post.id}" class="post-cta">Read more</a>
    </div>
</div>`;
  });
}

// load more posts when button is clicked
morePostsBtn.onclick = function () {
  page = page + 1;
  loadPosts();
};

// verify total posts
function verifyTotalPosts(headers) {
  // using get to get specific responde header
  const totalPosts = headers.get("X-WP-Total");
  // if totalPosts from WP is equal to current posts then button hides
  if (totalPosts == postsCount) {
    morePostsBtn.style.display = "none";
  }
}
