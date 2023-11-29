// import { Component } from 'react';
import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from './service/imagesAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGallery/ImageGalleryItem/ImageGalleryItem';
import { Button } from './Button/Button';
import { ColorRing } from 'react-loader-spinner';
import { Modal } from './Modal/Modal';
import css from './App.module.css';

export function App() {
  const [keyWord, setKeyWord] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoader(true);
        const { total, hits } = await getImages(keyWord, page);
        setImages(prevImages => [...prevImages, ...hits]);
        setTotal(total);
      } catch (error) {
        setError(true);
        console.log('Error: ', error);
      } finally {
        setLoader(false);
      }
    };

    if (keyWord && (page === 1 || page > 1)) {
      fetchImages();
    }
  }, [keyWord, page]);

  const handleFormSubmit = text => {
    setKeyWord(text);
    setPage(1);
    setImages([]);
    setTotal(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = largeImage => {
    setOpenModal(prevOpenModal => !prevOpenModal);
    setModalImage(largeImage);
  };

  return (
    <>
      <div className={css.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        {error && (
          <p className={css.message}>
            Something went wrong, please try again later.
          </p>
        )}
        <ImageGallery>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              preview={webformatURL}
              largeImage={largeImageURL}
              tag={tags}
              tgModal={toggleModal}
            />
          ))}
          {loader && (
            <ColorRing
              wrapper
              ClassName={css.Loader}
              visible={true}
              height="300"
              width="300"
              ariaLabel="blocks-loading"
              wrapperClass="blocks-wrapper"
              colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
            />
          )}
        </ImageGallery>
        {images.length < total && <Button addPhotos={handleLoadMore} />}
      </div>
      {openModal && <Modal modalImage={modalImage} closeModal={toggleModal} />}
    </>
  );
}

// *********************************************
// export class App extends Component {
//   state = {
//     keyWord: '',
//     page: 1,
//     images: [],
//     total: 0,
//     error: null,
//     loader: false,
//     openModal: false,
//     modalImage: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { keyWord, page } = this.state;
//     if (prevState.keyWord !== keyWord || prevState.page !== page) {
//       this.fetchImages(keyWord, page);
//     }
//   }

//   hendlSubmitForm = text => {
//     this.setState({ keyWord: text, page: 1, images: [], total: 0 });
//   };

//   fetchImages = async (keyWord, page) => {
//     try {
//       this.setState({ loader: true });
//       const { total, hits } = await getImages(keyWord, page);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         total: total,
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//       console.log('error: ', error);
//     } finally {
//       this.setState({ loader: false });
//     }
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   toglModal = largeImage => {
//     this.setState(({ openModal }) => ({
//       openModal: !openModal,
//       modalImage: largeImage,
//     }));
//   };

//   render() {
//     return (
//       <>
//         <div className={css.App}>
//           <Searchbar onSubmit={this.hendlSubmitForm} />
//           <ImageGallery>
//             {this.state.images.map(
//               ({ id, webformatURL, largeImageURL, tags }) => {
//                 return (
//                   <ImageGalleryItem
//                     key={id}
//                     preview={webformatURL}
//                     largeImage={largeImageURL}
//                     tag={tags}
//                     tgModal={this.toglModal}
//                   />
//                 );
//               }
//             )}
//             {this.state.loader && (
//               <ColorRing
//                 wrapper
//                 ClassName={css.Loader}
//                 visible={true}
//                 height="300"
//                 width="300"
//                 ariaLabel="blocks-loading"
//                 wrapperClass="blocks-wrapper"
//                 colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
//               />
//             )}
//           </ImageGallery>
//           {this.state.images.length < this.state.total && (
//             <Button addPhotos={this.onLoadMore} />
//           )}
//         </div>
//         {this.state.openModal && (
//           <Modal
//             modalImage={this.state.modalImage}
//             closeModal={this.toglModal}
//           />
//         )}
//       </>
//     );
//   }
// }
