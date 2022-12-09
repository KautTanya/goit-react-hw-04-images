import { MagnifyingGlass } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import { SearchBar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'API/Api';
import { LoadButton } from './Button/Button';
import Modal from './Modal/Modal';
import { Block } from './App.styled';
// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App(){
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [totalHits, setTotalHits] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bigImg, setModalBigImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');


  const  updateQuery = value => {
      setQuery(value.query);
      setPage(1);
      setImages([]);
  };

  const getImg = async () => {
    try {
      if (!query) {
        return; 
      }

      setIsLoading(true);
      const pictures = await getImages(page, query);
      setImages(state => [...state, ...pictures.images]);
      setIsLoading(false);
      setTotal(pictures.total);
      setTotalHits(pictures.totalHits);
    } catch (error) {
      setError(true);
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!query) {
      return;
    }
    getImg();
  }, [page, query]);


  const loadMore = async () => {
    setPage(state => state + 1);
  };
  const openModal = evt => {
  
    if (evt.target.nodeName !== 'IMG') {
      return;
    }
    setShowModal(true);
    setModalBigImg(evt.target.dataset.src);
    setModalAlt(evt.target.getAttribute('alt'));
  };
  const closeModal = () =>{
    setShowModal(false);
    setModalBigImg('');
    setModalAlt('');
  };

  return (
    <Block>
      <SearchBar updateQuery={updateQuery} />
     
       {images.length !== 0 && (
        <>
          <ImageGallery data={images} onClick={openModal} />{' '}
        </>
      )}
      {total >= 12 && images.length !== totalHits && !isLoading && (
        <LoadButton click={loadMore} />
      )}

      {isLoading && (
        <MagnifyingGlass
            visible={true}
            height="180"
            width="180"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = '#c0efff'
            color = '#e15b64'
      />
      )}

      {showModal && <Modal src={bigImg} alt={modalAlt} close={closeModal} />}
      {/* <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
    </Block>
  );
}


 