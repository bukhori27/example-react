import storage from '@example/storage-local'
import {Variables, Crypto} from '@example/security'
class Authenticate {
    constructor() {
        this.storage = new storage
        this.crypto = new Crypto
    }

    getDeviceId() {
        const chipperTextDeviceId = this.storage.getData(Variables.STORAGE_DEVICE_ID)
        return this.crypto.decrypt(chipperTextDeviceId)
    }

    headerPublic() {
        const chipperTextDeviceId = '123'
        const chipperTextClientSecret= 'mitra'

        if (chipperTextClientSecret != null && chipperTextDeviceId != null) {
            return {
                "client-secret": chipperTextClientSecret,
                "device-id": chipperTextDeviceId
            } 
        } else {
            return {}
        }
    }

    headerLogin() {
        const chipperTextTokenLogin = this.storage.getData(Variables.STORAGE_LOGIN_SECRET)
        if (chipperTextTokenLogin != "" && chipperTextTokenLogin != null) {
            return {
                "Authorization": "Bearer " + this.crypto.decrypt(chipperTextTokenLogin)
            }
        } else {
            return {}
        }
    }

    checkTokenLogin(){
        const chipperTextTokenLogin = this.storage.getData(Variables.STORAGE_LOGIN_SECRET)
        if (chipperTextTokenLogin != "" && chipperTextTokenLogin != null) {
            return true
        } else {
            return false
        }
    }
}

export default Authenticate
export reducer from './reducers'
export wrappingCheckToken from './wrappingCheckToken'