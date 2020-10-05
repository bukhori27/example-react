import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Button = ({ text, className, styleCss, onClick }) => (
    <button 
        className={className}
        style={styleCss} 
        onClick={onClick}>
            {text}
        </button>
);
Button.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    styleCss: PropTypes.object
}

export default Button;