import { Component } from 'react';

import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Searchbar from 'components/Searchbar';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import { fetchImages } from 'services/api';

class ImageGalleryPage extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    totalHits: null,
    loading: false,
    error: null,
    isModalOpen: false,
    modalData: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page, query } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      this.setState({ loading: true });
      try {
        const { hits, totalHits } = await fetchImages({
          per_page: 12,
          page,
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
        });

        if (!totalHits) {
          return alert(`There is no images found with search request ${query}`);
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          totalHits,
        }));
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleSetQuery = ({ query }) => {
    this.setState({ query, images: [], page: 1 });
  };

  toggleModal = modalData => {
    this.setState(prev => ({ isModalOpen: !prev.isModalOpen, modalData }));
  };

  render() {
    const { images, totalHits, isModalOpen, modalData, loading } = this.state;

    return (
      <>
        <Searchbar setQuery={this.handleSetQuery} />
        <h2>{this.state.error}</h2>
        {loading && !images.length ? (
          <Loader />
        ) : (
          <ImageGallery images={images} toggleModal={this.toggleModal} />
        )}

        {totalHits > images.length ? (
          <Button onClick={this.handleLoadMore}>
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        ) : null}

        {isModalOpen ? (
          <Modal onClose={this.toggleModal}>
            <img src={modalData.largeImageURL} alt={modalData.tags} />
          </Modal>
        ) : null}
      </>
    );
  }
}

export default ImageGalleryPage;
