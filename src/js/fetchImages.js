import axios from 'axios';

const API_KEY = '40038239-ab29a9fa4ef8cf118f337df0d';
const perPage = 40;

axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = async (query, page) => {
  const { data } = await axios({
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page: page,
    },
  });

  return data;
};

export { fetchImages, perPage };
