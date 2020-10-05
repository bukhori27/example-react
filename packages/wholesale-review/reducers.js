import {createAction, createReducer} from 'redux-act';
import Repository from './repository';
import {push} from 'react-router-redux'
import storage from '@example/storage-local';
import {openNotificationSuccess, openNotificationError} from '@example/notification/reducers';

export const setLoadingReview = createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_LOADING_REVIEW");
export const setLoadingVoucher = createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_LOADING_VOUCHER");
export const setLoadingStore = createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_LOADING_STORE");
export const setVoucher = createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_VOUCHER");
export const setCoupon = createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_COUPON");
export const setDetailCart= createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_DETAIL_CART");
export const setReview = createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_REVIEW");
export const setDateShipping = createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_DATE_SHIPPING");
export const setTimeShipping = createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_TIME_SHIPPING");
export const setDateTimeShipping = createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_DATE_TIME_SHIPPING");
export const setUsers = createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_USER");
export const setCouponValid = createAction("@@EXAMPLE_MITRA_WHOLESALE_SET_COUPON_VALID");

export const serviceReview = () => (dispatch, getState) => {      
    let repository = new Repository             
    const Storage = new storage;
    const { wholesaleReview } = getState() 
    dispatch(getUserReview())
    const storageListCart = 'carts';            
    const grandTotal = 'grandtotal';            
    dispatch(setLoadingReview(true))
    repository.getReview(wholesaleReview.filter, (data) => {   
        setTimeout(function () {
            dispatch(setLoadingReview(false))
            dispatch(setReview(data.cart))
            Storage.setData(storageListCart, JSON.stringify(data.cart));
            Storage.setData(grandTotal, data.cart.grand_total);
        },500)                  
    })         
    return Promise.resolve(true);
};

export const UpdateShippingDate = (params) => (dispatch, getState) => {
    let repository = new Repository     
    const { wholesaleReview } = getState() 
    if ((wholesaleReview.date == '' && wholesaleReview.time != '') || (wholesaleReview.date != '' && wholesaleReview.time == '')) { 
        dispatch(setDateTimeShipping(true))
    }else {
        dispatch(setLoadingStore(true))
        repository.UpdateShippingDate(params, (data) => {   
            setTimeout(function () {   
                if (!data.errors) {
                    dispatch(setLoadingStore(false))
                    dispatch(push('/wholesale-payment-options'))
                }else {
                    dispatch(setLoadingStore(false)) 
                    dispatch(openNotificationError(data.errors[0]))
                } 
            }, 500)
        })  
    } 
    return Promise.resolve(true);
}

export const storeVoucher = (params) => (dispatch, getState) => {   
    let repository = new Repository
    const Storage = new storage;
    const storageListCart = 'carts';         
    const grandTotal = 'grandtotal'; 
    const { wholesaleReview } = getState() 
    dispatch(setLoadingVoucher(true))
    repository.storeVoucher(params, (data) => {    
        setTimeout(function () {   
            if (!data.errors) {
                let datavoucher =  {
                    status :1,
                    data: data.cart
                }
                dispatch(setDetailCart(datavoucher))
                dispatch(setVoucher(datavoucher))
                Storage.setData(storageListCart, JSON.stringify(wholesaleReview.review));
                Storage.setData(grandTotal, data.cart.grand_total);
                dispatch(setLoadingVoucher(false))
            } 
            else {
                let datavoucher =  {
                    status :4,
                    data: wholesaleReview.review,
                    message: data.errors
                }
                dispatch(setVoucher(datavoucher))
                dispatch(setLoadingVoucher(false))
            }      
        }, 750)
    })        
    return Promise.resolve(true);
};

export const deleteVoucher = (params) => (dispatch, getState) => {   
    let repository = new Repository  
    const Storage = new storage;
    dispatch(setLoadingVoucher(true))   
    const grandTotal = 'grandtotal'; 
    dispatch(setVoucher(''))  
    if(params.voucherCheck){
        repository.deleteVoucher(params, (data) => {  
            setTimeout(function () {   
                if (data) {
                    let datavoucher =  {
                        data: data.cart
                    }
                    dispatch(setDetailCart(datavoucher))
                    Storage.setData(grandTotal, data.cart.grand_total);
                    dispatch(setLoadingVoucher(false))
                } 
                else {
                    dispatch(openNotificationError('Gagal', data))
                    dispatch(setLoadingVoucher(false))
                }      
            }, 500)
        })      
    }  else {
        dispatch(setLoadingVoucher(false))
    }   
    return Promise.resolve(true);
};

export const getUserReview = () => (dispatch) => {             
    const Storage = new storage;
    var user = JSON.parse(Storage.getData('user'));
    dispatch(setUsers(user))
    return Promise.resolve(true)
}

export const CheckValidCoupon = (params) => (dispatch, getState) => {
    let repository = new Repository      
    const { wholesaleReview } = getState() 
    if(wholesaleReview.review.coupon_code) {
        repository.CheckValidCoupon(wholesaleReview.review.coupon_code, (data) => {
            if (!data.errors) {
                dispatch(setCouponValid(true))
                dispatch(UpdateShippingDate(params))
            }else {
                dispatch(setLoadingVoucher(true))
                let datavoucher =  {
                    status :5,
                    data: wholesaleReview.review,
                    message: '<b>Kupon tidak valid. Mohon cek kembali kupon Anda</b>'
                }
                dispatch(setVoucher(datavoucher))
                dispatch(setCouponValid(false))
                setTimeout(function () { 
                    dispatch(setLoadingVoucher(false))
                }, 200)
                dispatch(openNotificationError('Gagal', data.errors[0])) 
            }
        })  
    }else {
        dispatch(UpdateShippingDate(params))
    }
    return Promise.resolve(true);
}

const initialState = {      
    loadingReview: false,    
    loadingVoucher: false,
    loadingStore: false,
    filter: {
    },        
    voucher: '',
    review: [],
    dateTime: false,        
    date: '',        
    time: '',   
    coupon: '',
    user:{},
    couponValid: false            
};

export default createReducer({    
    [setLoadingStore]: (state, loadingStore) => ({
        ...state,
        loadingStore
    }),  
    [setLoadingReview]: (state, loadingReview) => ({
        ...state,
        loadingReview
    }),  
    [setCouponValid]: (state, couponValid) => ({
        ...state,
        couponValid
    }), 
    [setLoadingVoucher]: (state, loadingVoucher) => ({
        ...state,
        loadingVoucher
    }),
    [setDetailCart]: (state, value) => {
        let {review} = state
        review.sub_total = value.data.subtotal
        review.discount_amount = value.data.discount_amount
        review.coupon_code = value.data.coupon_code
        review.grand_total = value.data.grand_total
        review.status = value.status
        return {
            ...state, 
            review
        }
    },  
    [setUsers]: (state, user) => ({
        ...state,
        user
    }),
    [setVoucher]: (state, voucher) => ({
        ...state,
        voucher
    }),
    [setReview]: (state, review) => ({
        ...state,
        review
    }),
    [setCoupon]: (state, coupon) => ({
        ...state,
        coupon
    }),
    [setDateTimeShipping]: (state, dateTime) => ({
        ...state,
        dateTime
    }), 
    [setDateShipping]: (state, date) => ({
        ...state,
        date
    }),  
    [setTimeShipping]: (state, time) => ({
        ...state,
        time
    }),    
}, initialState);