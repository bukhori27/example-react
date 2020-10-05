import React from 'react';
import { connect } from 'react-redux';
import './style.scss';
import { Col, Row } from 'antd';
import { LoadingShimmerProduct  } from '@example/components';
import Helper from '@example/helper';

const helper = new Helper;

const mapStateToProps = ({ wholesaleReview }) => { 
    return {    
        loadingVoucher: wholesaleReview.loadingVoucher,
        review: wholesaleReview.review, 
        voucher: wholesaleReview.voucher
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        'dispatch': dispatch
    }
}

class WholesaleReviewPriceDetails extends React.Component {
    render () {
        const {review, voucher, loadingVoucher } = this.props
        let totalPrice = review.sub_total
        if(!loadingVoucher){return (
            <div className="wholesale-review-price-detail">
                <Row>   
                    <div className="wholesale-review-price-detail-title">Rincian Harga</div>
                    <Col span={24}>
                        <Col span={12}><span>Total harga barang</span></Col>
                        <Col span={12} className="text-right"><span>{helper.checkFormat(totalPrice)}</span></Col>
                    </Col>
                    <Col span={24}>
                        <Col span={12}><span>Ongkos kirim</span></Col>
                        <Col span={12} className="text-right"><span>{helper.checkFormat(review.shipping_costs)}</span></Col>
                    </Col>
                    {/* <Col span={24}>
                            <Col span={24} className="text-notice">Ongkir per Agen Rp. 10.000</Col>
                        </Col> */}
                    <Col span={24}>
                        <Col span={12}><span>Diskon ongkos kirim</span></Col>
                        <Col span={12} className="text-right"><span>-{helper.checkFormat(review.shipping_costs_discount)}</span></Col>
                    </Col>
                    { voucher.status == 1 && <Col span={24}>
                        <Col span={12}><span>Potongan Voucher</span></Col>
                    <Col span={12} className="text-right"><span>-{helper.checkFormat(voucher.data.discount_amount)}</span></Col>
                    </Col>}
                    { review.discount_amount !== 0 && !voucher && <Col span={24}>
                        <Col span={12}><span>Potongan Voucher</span></Col>
                    <Col span={12} className="text-right"><span>-{helper.checkFormat(review.discount_amount)}</span></Col>
                    </Col>}
                </Row>
            </div>
        );}
        else{return (
            <span className="shimmerReview">
                <div className="wholesale-review-price-detail">
                    <Row>   
                        <div className="wholesale-review-price-detail-title">Rincian Harga</div>
                        <Col span={24}>
                            <Col span={12}><span>Total harga barang</span></Col>
                            <Col span={12} className="text-right">
                                <LoadingShimmerProduct loading={true} active list="1" paragraph={{ rows: 0 }} title={{ width: '87px' }}/>
                            </Col>
                        </Col>
                        <Col span={24}>
                            <Col span={12}><span>Ongkos kirim</span></Col>
                            <Col span={12} className="text-right">
                                <LoadingShimmerProduct loading={true} active list="1" paragraph={{ rows: 0 }} title={{ width: '87px' }}/>
                            </Col>
                        </Col>
                        {/* <Col span={24}>
                            <Col span={24}>Ongkir per Agen Rp. 10.000</Col>
                        </Col> */}
                        <Col span={24}>
                            <Col span={12}><span>Diskon ongkos kirim</span></Col>
                            <Col span={12} className="text-right">
                                <LoadingShimmerProduct loading={true} active list="1" paragraph={{ rows: 0 }} title={{ width: '87px' }}/>
                            </Col>
                        </Col>
                    </Row>
                </div>
            </span>
        );}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WholesaleReviewPriceDetails);