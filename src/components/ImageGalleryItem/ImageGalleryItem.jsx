import PropTypes from 'prop-types';
import { StyledImageGalleryItem } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  toggleModal,
}) => {
  return (
    <StyledImageGalleryItem>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => toggleModal({ largeImageURL, webformatURL, tags })}
      />
    </StyledImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
