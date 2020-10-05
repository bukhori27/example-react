import Curl from '@example/curl'
import {services} from '@example/config'

class Service extends Curl {
    constructor() {
        const config = {
            baseUrl: services.base_url,
            apiEndpoint: "/api",
            headers: {}
        }
        super(config)
    }

    getReview(filter) {                
        this.service = services.detail_cart
        this.method = 'get'
        this.data = filter        
        return this.send()
    }  
    UpdateShippingDate(filter) {     
        this.service = services.update_shipping_date
        this.method = 'put'
        this.data = filter        
        return this.send()
    }  
    storeVoucher(filter) {       
        this.service = services.store_voucher.replace("{CartId}", filter.cartId).replace("{CouponId}", filter.couponId) 
        this.method = 'put'
        this.data = filter        
        return this.send()
    }  
    deleteVoucher(filter) {     
        this.service = services.delete_voucher.replace("{CouponId}", filter.cartId) 
        this.method = 'delete'     
        return this.send()
    }
    CheckValidCoupon(filter) {     
        this.service = services.check_coupon.replace("{Coupon}", filter)
        this.method = 'get'     
        return this.send()
    }  
}

export default Service