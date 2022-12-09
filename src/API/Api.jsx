import PropTypes from 'prop-types';

const axios = require('axios').default;
const KEY = '29561920-1065b6adaef0eaf94313a88f4';
const BASIC_URL = `https://pixabay.com/api/?key=${KEY}&q=`;
const searchParams = '&image_type=photo&orientation=horizontal';

export const getImages = async (page, query) => {
  const serverURL = `${BASIC_URL}${query}${searchParams}&page=${page}&per_page=12`;
  try {
    const server = await axios.get(serverURL);
    const data = await server.data;
    const dataCards = {
      images: data.hits,
      total: data.hits.length,
      totalHits: data.totalHits,
    };
    return dataCards;
  } catch (error) {}
};

getImages.propTypes = {
  page: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
};
