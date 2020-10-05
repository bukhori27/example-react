import Curl from '@example/curl'
import {ajax} from '@example/config'

export const VARIABLE_CLIENT_SECRET = "cltns_ctrks"
class ClientSecret extends Curl {
    constructor() {
        let config = {
            baseUrl: ajax.baseUrl,
            apiEndpoint: "",
            headers: {
                "CSRF-Token": ajax.csrfToken
            }
        }
        super(config)
    }

    generate(deviceId) {
        this.service = ajax.generateClientSecretUrl
        this.method = 'post'
        this.data = {
            "browser_device_id": deviceId,
        }

        return this.send()
    }
}

export default ClientSecret