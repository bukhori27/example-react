import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, Row, Col, Radio, Input, Button } from 'antd';
import { Divider } from '@example/components';
import Header from '../wholesale-review/Header';
import { LoadingShimmerListTroli, FloatingLabelInput, LoadingShimmerProduct  } from '@example/components';
import iconLocation from '../assets/icons/map.png';
import './style.scss';

const styleCss = {fontSize:'12px', letterSpacing: '1px', fontWeight:'600', width: '100%', margin: 'auto', float: 'Right'}
class wholesaleReviewShimmer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let date = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
        let time = [{id: 1}, {id: 2}, {id: 3}]
        const { wholeSaleHomeUser } = this.props
        return (
            <div className="shimmerReview" style={{ marginTop: '56px' }}>
                <Header />   
                <Divider />  
                <div className="wholesale__address">
                    <div>
                        <img src={iconLocation} />
                    </div>
                    <div>
                        <span>Alamat Pengiriman</span>
                        <div style={{ width: '100%' }}>                
                            <p>{wholeSaleHomeUser.addresses}</p>    
                        </div>
                    </div>
                </div>    
                <Divider />
                <div className="wholesale-trolishopping-title">Daftar Belanja</div>
                <LoadingShimmerListTroli list="3" type="review"/>
                <Divider />
                <div className="wholesale-review-time-receipt">
                    <div className="wholesale-review-time-receipt-wrap">
                        <div className="wholesale-review-time-receipt-title">Tentukan Waktu Penerimaan Barang</div>
                        <Row>   
                            <div className="wholesale-review-time-receipt-subtitle">Pilih Tanggal:</div>
                            <Radio.Group defaultValue="">
                                {/* <Col span={2}></Col> */}
                                {date.map((time, indexing) =>
                                    <span key={indexing}>
                                        <Col span={4} className="text-center" >
                                            <Skeleton className="skeleton-dateshipping" active paragraph={{ rows: 0}} /> 
                                        </Col>
                                        <Col span={1}></Col>
                                    </span>
                                )}
                            </Radio.Group>
                        </Row>
                        <Row>
                            <div className="wholesale-review-time-receipt-subtitle">Pilih Jam:</div>
                            <Radio.Group defaultValue="">
                                {time.map((time, indexs) =>
                                    <Col span={8} className="text-center" key={indexs}>
                                        <Skeleton className="skeleton-timeshipping" active paragraph={{ rows: 0}} /> 
                                    </Col>
                                )}
                            </Radio.Group>
                        </Row>
                    </div>
                </div>
                <Divider />
                <div className="shimmerReview-voucher">
                    <Row>   
                        <div className="shimmerReview-voucher-title">Punya Voucher? Yuk dipake</div>
                        <Col xs={16} sm={19} md={19} lg={19}>
                            <span className="shimmerReview-voucher-text-field">Kode Voucher</span>
                            <Input readOnly placeholder="Masukan Kode Voucher"/>
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} className="text-right">
                            <Button className="shimmerReview-voucher-btn-cek">Gunakan</Button>
                        </Col>
                    </Row>
                </div>
                <Divider />
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
                        <Col span={24}>
                            <Col span={12}><span>Diskon ongkos kirim</span></Col>
                            <Col span={12} className="text-right">
                                <LoadingShimmerProduct loading={true} active list="1" paragraph={{ rows: 0 }} title={{ width: '87px' }}/>
                            </Col>
                        </Col>
                    </Row>
                </div>
                <Divider style="margin-bottom: 40px;"/>
                <div className="wholesale__review-submit-btn">
                    <div className="wholesale__review-submit-btn-wrap">
                        <Row>
                            <Col span={12} style={{marginTop:'1em'}}>
                                <span className="wholesale__review-submit-btn-text-title">Total Tagihan</span>
                                <Skeleton className="skeleton-timeshipping" active paragraph={{ rows: 0}} /> 
                            </Col>
                            <Col span={12} style={{marginTop:'1.3em'}}>
                                <Button style={styleCss} className="wholesale__review-submit-btn-button"
                                >Selanjutnya </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ wholeSaleHome }) => {
    return {
        wholeSaleHomeUser: wholeSaleHome.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserReview: () => {            
            dispatch(getUserReview())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(wholesaleReviewShimmer);