import throttle from 'lodash.throttle';
import axios from 'axios';

const API_KEY = '40038239-ab29a9fa4ef8cf118f337df0d';
const BASE_URL = 'https://pixabay.com/api/';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
console.dir(gallery);

let query = '';
let page = 1;
const perPage = 40;

form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', onSearchSubmit);

function handleInput(e) {
  query = e.target.value;
  console.log(query);
}

function onSearchSubmit(e) {
  e.preventDefault();
  console.log(e.currentTarget.elements.searchQuery.value);

  gallery.innerHTML = '';
  page = 1;
  query = e.currentTarget.elements.searchQuery.value.trim();
  if (query === '') {
    return;
  }
}

// const options = {
//   image_type: photo,
// };
async function getPhoto(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });
  // console.log(params.toString());
  const response = await axios.get(`${BASE_URL}?${params}`);
  console.log(response);
  return response;
}
console.log(getPhoto());
function makeCardMarkup(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <div class="photo-container">
        <a class="gallery__link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    </div>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
  </div>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  //   lightbox.refresh();
  //   selectors.btnUp.hidden = false;
  //   btnUp;
}
