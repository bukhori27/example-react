import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import { Divider } from '@example/components';
import { Spin } from 'antd';
import WholesaleReviewAddress from '@example/wholesale-review-address';
import WholesaleReviewPriceDetails from '@example/wholesale-review-price-detail';
import WholesaleReviewVoucher from '@example/wholesale-review-voucher';
import WholesaleReviewlistOrder from '@example/wholesale-review-list-oder';
import WholesaleReviewTimeReceipt from '@example/wholesale-review-time-receipt';
import WholesaleReviewSubmit from '@example/wholesale-review-submit';
import WholesaleShimmerReview from '@example/wholesale-review-shimmer';
import { serviceReview, setVoucher } from '@example/wholesale-review/reducers';
import Helper from '@example/helper';
import dayjs from 'dayjs'
import './style.scss';

const addBodyClass = className => document.body.classList.add(className);
const helper = new Helper;
class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {       
            loadingStore: false
        }
    }
    componentDidMount() {
        const {dispatch} = this.props
        dispatch(serviceReview())
        dispatch(setVoucher(''))  
        let appVersionCode = document.querySelector('meta[name=app_version_code]').getAttribute( 'content' );
        if (parseInt(appVersionCode)> 0)  {
            AndroidFunction.logEvent("screen_ws_cart_review");
        }
    }

    render() {
        const {review, loadingReview, loadingStore} = this.props
        let data = ''
        let currentDate = dayjs(Date.now()).format("DD/MM/YYYY")
        if (review) {
            data = review.cart_item
        }
        if (loadingReview)
        {
            return (
            <div style={{ marginTop: '56px' }}>
                <WholesaleShimmerReview />
            </div>
        )} else {
            return (
                <div className="wholesale-review-container" style={{ marginTop: '56px' }}>
                    <Spin spinning={loadingStore}>
                        <Header />    
                        <Divider />  
                        <WholesaleReviewAddress titleAddress="Alamat Pengiriman"/>
                        <Divider />
                        <WholesaleReviewlistOrder data={data}/>
                        { helper.checkHarboltong(currentDate) !== 1 && 
                            <> <Divider />
                            <WholesaleReviewTimeReceipt /> 
                            </>
                        }
                        <Divider />
                        <WholesaleReviewVoucher />
                        <Divider />
                        <WholesaleReviewPriceDetails />
                        <Divider style="margin-bottom: 40px;"/>
                        <WholesaleReviewSubmit />
                    </Spin>   
                </div>
            )
        }
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        'dispatch': dispatch
    }
}
const mapStateToProps = ({ wholesaleReview }) => {  
    return { 
        review: wholesaleReview.review,
        loadingReview: wholesaleReview.loadingReview,
        loadingStore: wholesaleReview.loadingStore
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Container);