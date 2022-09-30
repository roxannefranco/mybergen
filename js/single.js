import { url } from "./config.js";

const singleContainer = document.querySelector("#single-post");

// get parameters from url
const urlParams = new URLSearchParams(window.location.search);
let id = null;

if (urlParams.has("id")) {
  id = urlParams.get("id");
}

async function loadSingle() {
  try {
    let response = await fetch(`${url}/posts/${id}?_embed`);
    const singlePost = await response.json();
    // convert date
    const date = new Date(singlePost.date);
    // load single post
    singleContainer.innerHTML = `<div class="single-center">
    <p class="date-post">${date.toLocaleDateString("no")}</p>
    <h1 class="main-title single-center">${singlePost.title.rendered}</h1>
</div>
<div class="border-image"><img src="${
      singlePost["_embedded"]["wp:featuredmedia"][0].media_details.sizes.full
        .source_url
    }" alt="${singlePost.title.rendered}" />
</div>
<div class="single-center full-content">
    ${singlePost.content.rendered}
</div>`;
    loadModal();
  } catch (e) {
    console.log(e);
  }
}
loadSingle();

// modal image
function loadModal() {
  const images = document.querySelectorAll(".full-content figure");
  images.forEach((image) => {
    image.onclick = function () {
      // remove class when clicked if open
      if (image.classList.contains("modal")) {
        image.classList.remove("modal");
      } else {
        // add class when click
        image.classList.add("modal");
      }
    };
  });
}
