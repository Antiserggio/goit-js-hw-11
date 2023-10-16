import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { fetchImages, perPage } from './fetchImages';
import { loadMoreBtn, lightbox } from '..';
import { createMarkup } from './markup';
import { onScroll } from './scroll';

const getImages = async (query, page) => {
  try {
    Loading.circle('Loading data, please wait...', {
      svgColor: '#FF7E00',
      svgSize: '100px',
      messageFontSize: '30px',
      backgroundColor: 'rgba(0,0,0,0.8)',
    });
    const data = await fetchImages(query, page);
    Loading.remove();
    if (!data.hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    createMarkup(data);
    lightbox.refresh();
    onScroll();

    if (page === 1) {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    if (data.totalHits >= page * perPage) {
      loadMoreBtn.classList.remove('hidden');
    }

    if (data.totalHits <= page * perPage) {
      Notify.info("We're sorry, but you've reached the end of search results");
    }
  } catch (error) {
    console.log(error);
    Notify.failure('Oops! Something went wrong!');
  }
};

export { getImages };
