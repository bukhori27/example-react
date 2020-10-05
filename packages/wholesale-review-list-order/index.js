import React from 'react'
import { Col, Row, Collapse, Button } from 'antd';
import { connect } from 'react-redux';
import {push} from 'react-router-redux'
import './style.scss';
import indomie from '../assets/images/product.png';
import Helper from '@example/helper';
import imgNotFound from '../assets/icons/icon-no-image.png';
import { serviceListCart } from '@example/wholesale-troli-shopping/reducers';

const Panel = Collapse.Panel;
function callback(key) {
  console.log(key);
}
const helper = new Helper;
const mapDispatchToProps = (dispatch) => {
    return {
        'dispatch': dispatch
    }
}
const mapStateToProps = ({ wholeSaleDetail, wholeSaleCart }) => {  
    return {
        wholeSaleDetail: wholeSaleDetail.productDetail,      
        wholeSaleDetailSupplier: wholeSaleDetail.productDetailSupplier,     
        loadingProductDetail: wholeSaleDetail.loadingProductDetail,
        wholeSaleCart: wholeSaleCart.carts,      
        loadingListReview: wholeSaleCart.loadingListReview      
    }
}

class WholesaleReviewlistOrder extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            image_url: '',
            price: '',
            items: {}
        };
    }

    handlePrice (data) {
        let totalPrice
        totalPrice = data.reduce(function(prev, cur) {            
            return prev + (cur.price * cur.qty );
        }, 0);
        return helper.checkFormat(totalPrice);
    }
    render() {
        const{ data } = this.props
        if (data){
            return (
            <div className="wholesale-review-list-order">
                {/* <div className="wholesale-review-list-order-title">Daftar Belanja</div> */}
                <Collapse defaultActiveKey={1} onChange={callback}>
                    <Panel header='Daftar Belanja' key='1'>
                        <div className="wholesale-review-list-order-wrap">
                            { data.map((item, index) =>
                                <div className="wholesale-review-list-order-container" key={index}> 
                                    <div className="wholesale-review-list-order-container-agent" >Toko : {item.sellerName} </div>
                                    <hr/>
                                    { item.carts.map((item, index) =>
                                        <Row className="wholesale-review-list-order-box" key={index}>
                                                <Col xs={5} sm={5} md={3} lg={2} xl={2}>
                                                    <div className="wholesale-review-list-order-box-img">
                                                        <img src={item.image !== '' ? item.image : imgNotFound} alt={name} onError={(e)=>{e.target.onerror = null; e.target.src=imgNotFound}} />
                                                    </div>
                                                </Col>
                                                <Col xs={19} sm={19} md={20} lg={21} xl={21}>
                                                    <p className="wholesale-review-list-order-wrap-title">{helper.formatElipsisCustom(item.name, 75)}</p>
                                                    <p className="wholesale-review-list-order-wrap-count-order">{item.qty} Barang</p>
                                                    <p className="wholesale-review-list-order-wrap-price">{helper.checkFormat(item.qty * item.price)} </p>
                                                    {/* <p className="wholesale-review-list-order-wrap-agent">Agen : {item.seller_name} </p> */}
                                                </Col> 
                                                <Col span={24}>
                                                { item.is_price_changed && 
                                                    <div className="wholesale-troli-shopping-list-warning">
                                                        <Col span={24}><p className="wholesale-troli-shopping-list-warning-price">Harga telah berubah, silakan cek kembali</p></Col>
                                                    </div> 
                                                }
                                                { (item.remaining_promotion_qty < 6 && item.remaining_promotion_qty > 0) && item.qty > item.remaining_promotion_qty &&
                                                    <div className="wholesale-troli-shopping-list-warning" >
                                                        <Col span={24}><p className="wholesale-troli-shopping-list-warning-price">Ubah kuantiti barang kamu menjadi { item.remaining_promotion_qty }, untuk mendapatkan harga promo</p></Col>
                                                    </div>
                                                }
                                                </Col>
                                        </Row>
                                    )}
                                    <div className="wholesale-review-list-order-wrap-subtotal">
                                        <Row className="wholesale-review-list-order-wrap-container-3">
                                            <Col span={12}>SubTotal Toko : </Col>
                                            <Col span={12} className="text-right wholesale-review-list-order-wrap-container-3-price">{this.handlePrice(item.carts)} </Col>
                                        </Row>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Panel>
                </Collapse>
            </div>
        ) }
        return ('')
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WholesaleReviewlistOrder)