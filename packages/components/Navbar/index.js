import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

class NavBar extends React.Component{
    handleClick (item) {
        this.props.handleClick(item)
    }
    toLink (item) {
        this.props.toLink(item)
    }
    render(){
        const { children = '', title = '', imageSrc, onClick, toLink = '', className = '', imgRight = '', imgRightMulti = '', iconRight, styleCss, badge = false, badgeCount } = this.props                 
        return (
            <div className={`qasir-navbar ${className}`}>
                <a className="header__arrow-link-back" onClick={onClick}>
                    <img src={imageSrc} />
                </a>
                {
                    title !== '' && <span title={title}>{title}</span>
                }    
                {children}              
                {
                    iconRight &&
                    <div>
                        {
                            imgRightMulti !== '' &&
                            <a onClick={this.handleClick.bind(this)}>                            
                                <img src={imgRightMulti.transaction} style={styleCss}/>
                            </a>
                        }                  
                        <a onClick={this.toLink.bind(this)}>
                            {
                                badge && <span>{badgeCount}</span>
                            }
                            <img src={imgRightMulti !== '' ? imgRightMulti.cart : imgRight} style={styleCss}/>
                        </a>
                    </div>
                }
            </div>
        );
    }
}
NavBar.propTypes = {
    title: PropTypes.string,
    imageSrc: PropTypes.string,
    imgRight: PropTypes.string,
    imgRightMulti: PropTypes.object,        
    iconRight: PropTypes.bool,
    styleCss: PropTypes.object,
    badge: PropTypes.bool,
    badgeCount: PropTypes.number
};

export default NavBar;