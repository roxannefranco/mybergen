import { url } from "./config.js";

const carousel = document.querySelector(".carousel");

// select slider buttons
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
prevButton.onclick = function () {
  page = page - 1;
  loadPosts();
};
nextButton.onclick = function () {
  page = page + 1;
  loadPosts();
};

// posts
let posts = [];

// load posts
const perPage = 3;
let page = 1;

async function loadPosts() {
  try {
    let data = await fetch(
      `${url}/posts?per_page=${perPage}&page=${page}&_embed`
    );
    posts = await data.json();
    insertPosts();
  } catch (e) {
    // returns to first page
    page = 1;
    loadPosts();
  }
}
loadPosts();

// insert posts in HTML
function insertPosts() {
  const firstDate = new Date(posts[0].date);

  carousel.innerHTML = `<div class="carousel-left">
  <div class="post-vertical">
    <div class="post">
      <img src="${
        posts[0]["_embedded"]["wp:featuredmedia"][0].media_details.sizes.full
          .source_url
      }" alt="${posts[0].title.rendered}" />
      <div class="post-content">
        <div class="date-post">${firstDate.toLocaleDateString("no")}</div>
        <h2 class="post-title">${posts[0].title.rendered}</h2>
        ${posts[0].excerpt.rendered}
        <div class="post-cta-container">
          <a href="single.html?id=${posts[0].id}" class="post-cta">Read more</a>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="carousel-right">
  <div class="post-horiz">
    <div class="post">
        <img src="${
          posts[1]["_embedded"]["wp:featuredmedia"][0].media_details.sizes.full
            .source_url
        }" alt="${posts[1].title.rendered}" />
        <div class="post-content">
            <div class="date-post">${firstDate.toLocaleDateString("no")}</div>
            <h2 class="post-title">${posts[1].title.rendered}</h2>
            ${posts[1].excerpt.rendered}
            <div class="post-cta-container">
            <a href="single.html?id=${
              posts[1].id
            }" class="post-cta">Read more</a>
            </div>
        </div>
    </div>
  </div>
  <div class="post-horiz">
    <div class="post">
        <img src="${
          posts[2]["_embedded"]["wp:featuredmedia"][0].media_details.sizes.full
            .source_url
        }" alt="${posts[2].title.rendered}" />
        <div class="post-content">
            <div class="date-post">${firstDate.toLocaleDateString("no")}</div>
            <h2 class="post-title">${posts[2].title.rendered}</h2>
            ${posts[2].excerpt.rendered}
            <div class="post-cta-container">
            <a href="single.html?id=${
              posts[2].id
            }" class="post-cta">Read more</a>
            </div>
        </div>
    </div>
  </div>
</div>`;
}
