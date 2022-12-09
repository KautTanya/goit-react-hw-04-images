import { Li, Img } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ img, alt, onClick, largeImageURL }) => {
  return (
    <Li>
      <Img src={img} alt={alt} data-src={largeImageURL} onClick={onClick} />
    </Li>
  );
};

ImageGalleryItem.propTypes = {
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
