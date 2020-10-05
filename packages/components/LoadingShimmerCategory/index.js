import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Row, Col } from 'antd';
import './style.scss';

const LoadingShimmerCategory = ({ loading, active, avatar, children, paragraph, list, styleCss, title }) => {    
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
        <div className="loading__shimmer-category" style={styleCss}>
            {/* <Row> */}
                {renderEl}
            {/* </Row> */}
        </div>
    );
}

LoadingShimmerCategory.propTypes = {
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

export default LoadingShimmerCategory;