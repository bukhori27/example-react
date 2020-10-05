import React from 'react'
import { connect } from 'react-redux';
import {push} from 'react-router-redux'
import { Skeleton, Col, Row, Button } from 'antd';
import { CheckValidCoupon, setDateTimeShipping } from '@example/wholesale-review/reducers';
import Helper from '@example/helper';

import './style.scss';

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}
const mapStateToProps = ({ wholesaleReview }) => { 
    return {    
        date: wholesaleReview.date,    
        time: wholesaleReview.time,
        review: wholesaleReview.review, 
        voucher: wholesaleReview.voucher,
        loadingvoucher: wholesaleReview.loadingVoucher
    }
}
const helper = new Helper;
const styleCss = {fontSize:'12px', letterSpacing: '1px', fontWeight:'600', width: '100%', margin: 'auto', float: 'Right'}
class WholesaleReviewSubmit extends React.Component {
    constructor(props) {
        super(props);
    }
    handleSubmit() {
        const { dispatch, date, time, review } = this.props
        dispatch(setDateTimeShipping(false))
        let data = {}
        if (time && date) {
            data = {
                date: date + ' ' + helper.changeStartTime(time) + ':00.00',
                cart_id : parseInt(review.cart_id)
            }
        } else {
            data = { 
                cart_id : parseInt(review.cart_id)
            }
        }
        let appVersionCode = document.querySelector('meta[name=app_version_code]').getAttribute( 'content' );
        if (parseInt(appVersionCode)> 0)  {
            AndroidFunction.logEvent("ws_review_button_submit_shipping_date");
        }  
        dispatch(CheckValidCoupon(data))
    }
    render() {
        const { review, voucher, loadingvoucher } = this.props
        let totalPrice = ''
        if (!loadingvoucher) {
            if (voucher ==='') { totalPrice = review.grand_total 
            } else { totalPrice = voucher.data.grand_total }
        }
        return (
            <div className="wholesale__review-submit-btn">
                <div className="wholesale__review-submit-btn-wrap">
                    <Row>
                        <Col span={12} style={{marginTop:'1em'}}>
                            <span className="wholesale__review-submit-btn-text-title">Total Tagihan</span>
                            {!loadingvoucher && <p className="wholesale__review-submit-btn-text-price">{helper.checkFormat(totalPrice)}</p> }
                            {loadingvoucher && <Skeleton className="skeleton-total" active paragraph={{ rows: 0}} /> }
                        </Col>
                        <Col span={12} style={{marginTop:'1.3em'}}>
                            <Button style={styleCss} className="wholesale__review-submit-btn-button" htmlType="submit" 
                            onClick={() =>this.handleSubmit(this)}
                            >Selanjutnya </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(WholesaleReviewSubmit)