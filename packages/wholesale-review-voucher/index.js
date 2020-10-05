import React from 'react';
import { connect } from 'react-redux';
import './style.scss';
import { Col, Row, Form, Button, Spin } from 'antd';
import { withRouter } from 'react-router-dom'
import { FloatingLabelInput, QsrSpan } from '@example/components';
import { storeVoucher, deleteVoucher, setVoucher } from '@example/wholesale-review/reducers';
import storage from '@example/storage-local';
import Helper from '@example/helper';
import IconCheck from '../assets/icons/check_circle.png';

const helper = new Helper;
const Storage = new storage;

class WholesaleReviewVoucher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {            
            messageValue: '',
            valueSuccess: false,
            valuefailed: false,
            valueVoucher: '',
            loading: false,
            icon: '',
            statusVoucher: false,
            classVoucher: 'default',
            status: 0
        }
    }

    componentWillReceiveProps(nextprops){
        if(!nextprops.loading){
            if (nextprops.voucher.status === 1){
                this.setState({
                    statusVoucher:true,
                    classVoucher:'default',
                    messageValue:'Selamat voucher kamu telah aktif',
                    icon:<img className="wholesale-review-voucher-icon-check" src={IconCheck}/>,
                    status: 0
                })
            } else if( nextprops.voucher.status !== 1){
                this.setState({
                    statusVoucher:true,
                    classVoucher:'failed',
                    messageValue:nextprops.voucher.message,
                    icon:<span className="wholesale-review-voucher-icon-cross">x</span>,
                    status: 1
                })
            }
            if (nextprops.review.coupon_code && nextprops.voucher === "") {
                this.setState({
                    statusVoucher:true,
                    classVoucher:'default',
                    messageValue:'Selamat voucher kamu telah aktif',
                    icon:<img className="wholesale-review-voucher-icon-check" src={IconCheck}/>,
                    status: 0
                })
                
            }
        }        
    }
    handleCheck () {                        
        this.props.form.validateFields((err, values) => {
            const {dispatch} = this.props
            const Carts =JSON.parse(Storage.getData('carts'));
            if(values.voucher){
                let params = {
                    cartId: Carts.cart_id, 
                    couponId: values.voucher
                }
                this.setState ({
                    valueVoucher: values.voucher
                })
                dispatch(storeVoucher(params));
                   
            }
        });
    }
    deleteVoucher () {                    
        const {dispatch, voucher, review} = this.props
        const Carts =JSON.parse(Storage.getData('carts'));
        let params = ''
        this.props.form.validateFields((err, values) => {
            if(voucher.status == 1){
                params = {
                    cartId: Carts.cart_id,
                    voucherCheck : true
                }
            }else if(voucher.status == 5){
                params = {
                    cartId: Carts.cart_id,
                    voucherCheck : true
                }
            }else{
                params = {
                    cartId: Carts.cart_id,
                    voucherCheck : false
                }
            }
            this.setState ({
                valueVoucher: ''
            })
            dispatch(deleteVoucher(params));
            this.props.form.resetFields();
        });
        if (review.coupon_code && !voucher) {
            params = {
                cartId: Carts.cart_id,
                voucherCheck : true
            }
            this.setState ({
                valueVoucher: ''
            })
            dispatch(deleteVoucher(params));
        }
    }
    
    handleChange = e => {  
        this.deleteVoucher();   
    }
    render () {
        const {form, voucher, loading, review} = this.props
        const { messageValue, statusVoucher, classVoucher, icon, status} = this.state
        return (
            <div className="wholesale-review-voucher voucher-wrap-custom">
                <Form>
                    <Row>   
                        <div className="wholesale-review-voucher-title">Punya Voucher? Yuk dipake</div>
                        <Col xs={16} sm={19} md={19} lg={19}>
                            <FloatingLabelInput  
                                form={form} 
                                fieldName="voucher"
                                label="Kode Voucher" 
                                message="Masukan kode voucher Anda" 
                                defaultValue={review.coupon_code}
                                autocomplete="off"
                                placeholder="Masukan Kode Voucher"
                                onkeyup={this.handleChange} 
                            />
                            {review.coupon_code && icon}
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5} className="text-right">
                            <Spin spinning={loading}>
                                {!review.coupon_code && <Button className="wholesale-review-voucher-btn-cek" onClick={() =>this.handleCheck(this)}>Gunakan</Button>}
                                {review.coupon_code && status=== 0 && <Button className="wholesale-review-voucher-btn-cek-disable" onClick={() =>this.deleteVoucher(this)}>Batal</Button>}
                                {review.coupon_code && status=== 1 && <Button className="wholesale-review-voucher-btn-cek-error" onClick={() =>this.deleteVoucher(this)}>Batal</Button>}
                            </Spin>    
                        </Col>
                        <Col xs={16} sm={19} md={19} lg={19}>
                            { messageValue && statusVoucher === true && <QsrSpan 
                                classname={classVoucher}
                                title={messageValue}
                                styleCss={{fontSize: '12px'}}/>}
                        </Col>
                        <Col xs={8} sm={5} md={5} lg={5}></Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({ wholesaleReview }) => {    
    return {
       voucher: wholesaleReview.voucher,
       review: wholesaleReview.review,
       loading: wholesaleReview.loadingVoucher
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        'dispatch': dispatch,
        'storeVoucher': (params)=>{dispatch(storeVoucher(params))},
        'setVoucher': (params)=>{dispatch(setVoucher(params))}
    }
}
export default Form.create({})(withRouter(connect(mapStateToProps,mapDispatchToProps)(WholesaleReviewVoucher)))