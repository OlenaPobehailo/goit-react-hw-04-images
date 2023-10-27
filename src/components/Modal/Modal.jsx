import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { OverLay, StyledModal } from './Modal.styled';

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const closeModalByEscape = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    const closeModal = () => {
      onClose();
    };

    window.addEventListener('keydown', closeModalByEscape);

    return () => {
      window.removeEventListener('keydown', closeModalByEscape);
    };
  }, [onClose]);

  const closeModalByClickOutside = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <OverLay onClick={closeModalByClickOutside}>
      <StyledModal>{children}</StyledModal>
    </OverLay>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
