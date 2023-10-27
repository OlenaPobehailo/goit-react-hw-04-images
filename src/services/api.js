import axios from 'axios';

const API_KEY = '38155142-b3f442c08f687eaddf44363c7';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async params => {
  const { data } = await axios.get('', {
    params: {
      key: API_KEY,
      ...params,
    },
  });

  return data;
};
