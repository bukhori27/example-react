import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

import { Divider} from '@example/components';
import './style.scss';

const LoadingShimmerListPromo= ({ loading, active, avatar, children, paragraph, list, styleCss, title, type }) => {    
    let renderEl = [];
    for (var i = 0; i < list; i++) {
      renderEl.push(
        <span key={i}>
          <div className="loading__shimmer-card-promo-shimmer"> </div>
          <span className="loading__shimmer-card-promo-content" >
            <Skeleton 
              loading={loading} 
              active={active} 
              avatar={avatar}                 
              paragraph={paragraph}   
              title={title}     
            >
              {children}
            </Skeleton>
          </span>
          <Divider />
        </span>
      );
    }
    return (
      <div className="loading__shimmer-card-promo" style={styleCss}>
        {renderEl}
      </div>
    );
}

LoadingShimmerListPromo.propTypes = {
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

export default LoadingShimmerListPromo;