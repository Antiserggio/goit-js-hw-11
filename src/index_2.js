import throttle from 'lodash.throttle';
import { getImages } from './getImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// const BASE_URL = axios.defaults.baseURL;

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
// console.dir(gallery);

let query = '';
let page = 1;

form.addEventListener('input', throttle(handleInput, 500));
form.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onloadMoreBtnClick);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function handleInput(e) {
  query = e.target.value;
  //   console.log(query);
}

function onSearchSubmit(e) {
  e.preventDefault();
  //   console.log(e.currentTarget.elements.searchQuery.value);

  query = e.currentTarget.elements.searchQuery.value.trim();
  if (query === '') {
    return;
  }
  gallery.innerHTML = '';
  page = 1;
  loadMoreBtn.classList.add('hidden');
  getImages(query, page);

  form.reset();
}

function onloadMoreBtnClick() {
  loadMoreBtn.classList.add('hidden');
  page += 1;

  getImages(query, page);
}

export { gallery, loadMoreBtn, lightbox };
