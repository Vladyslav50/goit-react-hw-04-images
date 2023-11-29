// import { Component } from 'react';
import React, { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ modalImage, closeModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const closeOnBackdrop = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={closeOnBackdrop}>
      <div className={css.Modal}>
        <img src={modalImage} alt="" />
      </div>
    </div>
  );
};

//*********************************************************** */
// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.hendleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.hendleKeyDown);
//   }

//   hendleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   closeOnBackdrop = event => {
//     if (event.target === event.currentTarget) {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     return (
//       <div className={css.Overlay} onClick={this.closeOnBackdrop}>
//         <div className={css.Modal}>
//           <img src={this.props.modalImage} alt="" />
//         </div>
//       </div>
//     );
//   }
// }
