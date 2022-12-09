import { MagnifyingGlass } from 'react-loader-spinner';
import { Component } from 'react';
import { SearchBar } from './Searchbar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'API/Api';
import { LoadButton } from './Button/Button';
import Modal from './Modal/Modal';
import { Block } from './App.styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    query: '',
    images: [],
    isLoading: false,
    error: false,
    page: 1,
    total: null,
    totalHits: null,
    showModal: false,
    modalData: {
      bigImg: '',
      alt: '',
    },
  };
  updateQuery = value => {
    this.setState({
      query: value.query,
      page: 1,
      images: [],
    });
    
  };
  getImg = async () => {
   
    try {
      if (!this.state.query) {
        return 
      }

      this.setState({ isLoading: true });

      const pictures = await getImages(this.state.page, this.state.query);
      
      this.setState(prevState => ({
        images: [...prevState.images, ...pictures.images],
        isLoading: false,
        total: pictures.total,
        totalHits: pictures.totalHits,
      }));
      
      return this.toastify();
    } catch (error) {
      this.setState({ error: true, isLoading: false });
    }
  };
  async componentDidUpdate(_, prevState) {
    const prevRequest = prevState.query;
    const nextRequest = this.state.query;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevRequest !== nextRequest || prevPage !== nextPage ) {
    
          this.getImg();
    }
   
  }

  toastify = () => {
    const { total} = this.state;
    if (total === 0) {
      return toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
    }
  
  }
    loadMore = async () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  openModal = evt => {
  
    if (evt.target.nodeName !== 'IMG') {
      return;
    }
    this.setState({
      showModal: true,
      modalData: {
        bigImg: evt.target.dataset.src,
        alt: evt.target.getAttribute('alt'),
      },
    });
  };
  closeModal = () => {
    this.setState({
      showModal: false,
      modalData: {
        bigImg: '',
        alt: '',
      },
    });
  };
  render() {
    const { images, isLoading, total, totalHits, showModal, modalData } =
      this.state;
    const { bigImg, alt } = modalData;
    return (
      <Block>
        <SearchBar updateQuery={this.updateQuery} />
       
         {images.length !== 0 && (
          <>
            <ImageGallery data={images} onClick={this.openModal} />{' '}
          </>
        )}
        {total >= 12 && images.length !== totalHits && !isLoading && (
          <LoadButton click={this.loadMore} />
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

        {showModal && <Modal src={bigImg} alt={alt} close={this.closeModal} />}
        <ToastContainer
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
        />
      </Block>
    );
  }
}
