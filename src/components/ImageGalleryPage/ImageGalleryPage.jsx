import { useEffect, useState } from 'react';

import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Searchbar from 'components/Searchbar';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import { fetchImages } from 'services/api';

const ImageGalleryPage = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [loading, setLoading] = useState('');
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (page === 1) {
        setImages([]);
      }
      setLoading(true);
      try {
        const { hits, totalHits } = await fetchImages({
          per_page: 12,
          page,
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
        });

        if (!totalHits) {
          return alert(
            `There are no images found with the search request ${query}`
          );
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (page !== 1 || query !== '') {
      fetchData();
    }
  }, [page, query]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleSetQuery = ( query ) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const toggleModal = modalData => {
    setIsModalOpen(prev => !prev);
    setModalData(modalData);
  };

  return (
    <>
      <Searchbar setQuery={handleSetQuery} />
      <h2>{error}</h2>
      {loading && !images.length ? (
        <Loader />
      ) : (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}

      {totalHits > images.length ? (
        <Button onClick={handleLoadMore}>
          {loading ? 'Loading...' : 'Load more'}
        </Button>
      ) : null}

      {isModalOpen ? (
        <Modal onClose={toggleModal}>
          <img src={modalData.largeImageURL} alt={modalData.tags} />
        </Modal>
      ) : null}
    </>
  );
};

export default ImageGalleryPage;
