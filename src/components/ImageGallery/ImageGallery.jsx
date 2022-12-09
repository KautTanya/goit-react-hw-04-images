import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Ul } from './ImageGallery.styled';
import PropTypes from 'prop-types';
export const ImageGallery = ({ data, onClick }) => {
  return (
    <Ul>
      {data.map(img => {
        return (
          <ImageGalleryItem
            img={img.webformatURL}
            alt={img.tags}
            largeImageURL={img.largeImageURL}
            key={img.id}
            onClick={onClick}
          />
        );
      })}{' '}
    </Ul>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
