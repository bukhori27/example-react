import React from 'react';
import PropTypes from "prop-types";
import { NavBar, Button } from '@example/components';
import closeIcon from '../../assets/icons/icon-close.png'
import './PostTransactionScreen.scss'

export class PostTransactionScreen extends React.PureComponent {
  render() {
    const {
      title, 
      message, 
      imageSrc, 
      buttonText,
      onClickButton,
      onClosePage,
      } = this.props;

    return (
      <div className="post-transaction-screen">
        <NavBar 
            onClick={onClosePage} 
            title={''}
            imageSrc={closeIcon}
            />
          <div className="wholesale-success-order">
            <div>
              <img src={imageSrc} className='wholesale-success-order__state-img' alt="banner success"/>
            </div>
            <div style={{padding:'10px'}} className='wholesale-success-order__state' >
              <div className='wholesale-success-order__state-title text-center'>{title}</div>
              <div className='wholesale-success-order__state-value text-center'>{message}</div>
            </div>
            <div style={{padding:'20px'}} className="qasirButton">
              <Button 
                  text={buttonText}
                  className="btn wholesale-success-order-btn text-center"
                  onClick={onClickButton}
              />
            </div>
          </div>
      </div>
    )
  }
}

PostTransactionScreen.propTypes = {
  /**
   * imageSrc, string type, banner image.
   */
  imageSrc: PropTypes.string.isRequired,

  /**
   * title, string type, or message header.
   */
  title: PropTypes.string.isRequired,

  /**
   * message, string type, main message displayed in page.
   */
  message: PropTypes.string.isRequired,

  /**
   * buttonText, string type, text to be displayed in the button.
   */
  buttonText: PropTypes.string.isRequired,

  /**
   * onClickButton, func type, onClickButton event handler.
   */
  onClickButton: PropTypes.func.isRequired,

  /**
   * onClosePage, func type, onClosePage event handler.
   */
  onClosePage: PropTypes.func.isRequired,
}
