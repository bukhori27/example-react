import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

import './style.scss';

const LoadingShimmerProduct = ({ loading, active, avatar, children, paragraph, list, styleCss, title, type }) => {    
    let renderEl = [];
    for (var i = 0; i < list; i++) {
        renderEl.push(
            <Skeleton 
                key={i}
                loading={loading} 
                active={active} 
                avatar={avatar}                 
                paragraph={paragraph}   
                title={title}     
            >
                {children}
            </Skeleton>
        );
    }
    return (
        <div className="loading__shimmer-product" style={styleCss}>
            {renderEl}
        </div>
    );
}

LoadingShimmerProduct.propTypes = {
    loading: PropTypes.bool.isRequired,
    active: PropTypes.bool,
    avatar: PropTypes.bool,
    paragraph: PropTypes.object,
    list: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    className: PropTypes.string,
    styleCss: PropTypes.object,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ])
}

export default LoadingShimmerProduct;