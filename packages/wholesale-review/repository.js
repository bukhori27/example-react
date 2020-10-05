import Service from './service'
import {from} from 'rxjs'
import { map, filter } from 'rxjs/operators'
import ResponseError from '@example/security/responseApiError'

class Repository {
    constructor() {
        this.service = new Service
        this.responseError = new ResponseError
    }
    getReview(params, callback) {
        from(this.service.getReview(params))
            .pipe(map(body => body.data))
            .pipe(map(item => item.data))
            .pipe(map((data) => {
                data = this.addObjectReview(data)
                return data
            }))
            .subscribe({
                next: (data) => {                    
                    callback(data)
                }, error: (error) => {
                    this.responseError.checkStatus(error.response.data)   
                    callback(null)
                }
            })
    }
    UpdateShippingDate(params, callback) {
        from(this.service.UpdateShippingDate(params))
            .pipe(map(body => body.data))
            .pipe(map(item => item.data))
            .subscribe({
                next: (data) => {                    
                    callback(data)
                }, error: (error) => {
                    this.responseError.checkStatus(error.response.data.data)   
                    callback(error.response.data.data)
                }
            })
    }
    storeVoucher(params, callback){
        from(this.service.storeVoucher(params))
            .pipe(map(body => body.data))
            .pipe(map(item => item.data))
            .subscribe({
                next: (data) => {                    
                    callback(data)
                }, error: (error) => {
                    this.responseError.checkStatus(error.response.data)   
                    callback(error.response.data.data)
                }
            })
    }
    deleteVoucher(params, callback){
        from(this.service.deleteVoucher(params))
            .pipe(map(body => body.data))
            .pipe(map(item => item.data))
            .subscribe({
                next: (data) => {                    
                    callback(data)
                }, error: (error) => {
                    this.responseError.checkStatus(error.response.data)   
                    callback(null)
                }
            })
    }
    CheckValidCoupon(params, callback) {
        from(this.service.CheckValidCoupon(params))
            .pipe(map(body => body.data))
            .pipe(map(item => item.data))
            .subscribe({
                next: (data) => {                    
                    callback(data)
                }, error: (error) => {
                    this.responseError.checkStatus(error.response.data.data)   
                    callback(error.response.data.data)
                }
            })
    }
    addObjectReview (data) {
        console.log(data)
        if (data.cart != null){
            let groupArrays = data.cart.cart_item;
            let grandtotal = 0
            const groups = groupArrays.reduce((groups, activity) => {
                const sellerName = activity.seller_name;
                grandtotal = grandtotal + (activity.price * activity.qty) ;
                if (!groups[sellerName]) {
                    groups[sellerName] = [];
                }
                groups[sellerName].push(activity);
                return groups;
                }, {});
                // Edit: to add it in the array format instead
                const groupArray = Object.keys(groups).map((sellerName) => {
                    return {
                        sellerName,
                        carts: groups[sellerName],
                        grandtotal
                    };
                });
                groupArray
            data.cart.cart_item = groupArray;
        }else{
            data.cart = [];
        }
        return data;
    }
}

export default Repository