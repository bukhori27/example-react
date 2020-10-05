import React from 'react';
import PropTypes from 'prop-types';
import {span} from 'antd';

import { CardProduct } from '@example/components';
import { LoadingShimmerProduct } from '@example/components';

import './style.scss';

const GridBoxListSearch = ({ data, style, loadingScrollProduct, onshowDrawer }) => (
    <div className="grid__box-group" style={style}>        
        {
            data.map((item, index) => {                          
                return (
                <div className="grid__box-item" key={index} >
                    <CardProduct item={item}  onshowDrawer={onshowDrawer}/>
                </div>
                );
            })
        } 
        {
            (data.length) % 2 === 1 && loadingScrollProduct && 
            <LoadingShimmerProduct loading={true} active avatar list="1" paragraph={{ rows: 1 }} title={{ width: '85%' }} /> 
        }
        {
            (data.length) % 2 === 0 && loadingScrollProduct && 
            <span id="grid2"><LoadingShimmerProduct loading={true} active avatar list="2" paragraph={{ rows: 1 }} title={{ width: '85%' }} /> </span>
        }           
    </div>
    
);

GridBoxListSearch.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        item: PropTypes.object        
    }))
}

export default GridBoxListSearch;