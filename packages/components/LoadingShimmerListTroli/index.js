import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { LoadingShimmerTroli } from '@example/components'
import './style.scss';

const LoadingShimmerListTroli = ({ list, type  }) => {    
    let renderEl = [];
    for (var i = 0; i < list; i++) {
        if(type === 'troli'){
            renderEl.push(
            <Row className="wholesale-trolishopping-shimmer" key={i}>
                <Col className="wholesale-trolishopping-shimmer-left" xs={6} sm={6} md={3} lg={3}><LoadingShimmerTroli loading={true} active avatar list="1" paragraph={{ rows: 0 }} title={{ width: "100%" }} /></Col>
                <Col className="wholesale-trolishopping-shimmer__right" xs={18} sm={18} md={21} lg={21}><LoadingShimmerTroli loading={true} active list="1" paragraph={{ rows: 1 }} title={{ width: "80%" }} /></Col>
            </Row>
            );
        }
        else{
            renderEl.push(
            <Row className="wholesale-trolishopping-shimmer shimmer-type-other" key={i}>
                <Col className="wholesale-trolishopping-shimmer-left" xs={6} sm={6} md={3} lg={3}><LoadingShimmerTroli loading={true} active avatar list="1" paragraph={{ rows: 0 }} title={{ width: "100%" }} /></Col>
                <Col className="wholesale-trolishopping-shimmer__right" xs={18} sm={18} md={21} lg={21}><LoadingShimmerTroli loading={true} active list="1" paragraph={{ rows: 2 }} title={{ width: "80%" }} /></Col>
            </Row>
            );
        }
    }
    return (
        <span>
            {renderEl}
        </span>
    );
}

LoadingShimmerListTroli.propTypes = {
    list: PropTypes.string.isRequired,
    type: PropTypes.string
}

export default LoadingShimmerListTroli;