import { Component } from 'react';
import PropTypes from 'prop-types';
import { OverLay, StyledModal } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEscape);
  }

  closeModalByEscape = e => {
    if (e.code === 'Escape') {
      this.closeModal();
    }
  };

  closeModalByClickOutside = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  closeModal = () => {
    this.props.onClose();
  };

  render() {
    return (
      <OverLay onClick={this.closeModalByClickOutside}>
        <StyledModal>{this.props.children}</StyledModal>
      </OverLay>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
