import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { StyledImageGallery } from './ImageGallery.styled';

const ImageGallery = ({ toggleModal, images = [] }) => {
  return (
    <StyledImageGallery>
      {images.map(image => (
        <ImageGalleryItem key={image.id} toggleModal={toggleModal} {...image} />
      ))}
    </StyledImageGallery>
  );
};

ImageGallery.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
