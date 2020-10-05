import React from 'react';
import PropTypes from 'prop-types';
import { Drawer as DrawerAntd } from 'antd';

import './style.scss';

const Drawer = ({ title, visible, placement, closable, onClose, className, children }) => {
    return (
        <DrawerAntd
            title={title}
            visible={visible}
            placement={placement}
            closable={closable}                
            onClose={onClose}            
            className={className}
            >
            { children }                                        
        </DrawerAntd>    
    );
}

Drawer.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    onClose: PropTypes.func,
    className: PropTypes.string
}

export default Drawer;