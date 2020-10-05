const CryptoJS = require("crypto-js");

class Crypto {
    constructor() {
        this.secretKey =  "qasir-crm-application-secret"
    }

    encrypt(text) {
        return CryptoJS.AES.encrypt(text, this.secretKey)
    }   

    decrypt(chiperText) {
        const bytes = CryptoJS.AES.decrypt(chiperText, this.secretKey)
        return bytes.toString(CryptoJS.enc.Utf8)
    }
}

export default Crypto