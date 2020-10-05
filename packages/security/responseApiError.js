import {ajax} from '@example/config'

class ResponseError {

    checkStatus(data) {
        var status = data.status
        const statusToken =[8,9,10]
        if (statusToken.includes(status)){
            let baseUrl = ajax.baseUrl
            location.replace(baseUrl + "/#/")
        }
    }
}

export default ResponseError