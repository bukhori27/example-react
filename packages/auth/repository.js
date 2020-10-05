import ClientSecret from './clientSecret'
import storage from '@example/storage-local'
import {Variables, Crypto} from '@example/security'
import Service from './service'
import {from} from 'rxjs'
import {map, filter} from 'rxjs/operators'
import auth from './index'

class Repository {
    constructor() {
        this.auth = new auth
        this.clientSecret = new ClientSecret
        this.crypto = new Crypto
        this.storage = new storage
        this.service = new Service
    }

    hasClientSecret() {
        const chipperText = this
            .storage
            .getData(Variables.STORAGE_CLIENT_SECRET)
        if (chipperText == "" || chipperText == null) {
            return false
        } else {
            const clientSecret = this
                .crypto
                .decrypt(chipperText)
            return clientSecret != ""
        }
    }

    resetStorage() {
        this
            .storage
            .setData(Variables.STORAGE_LOGIN_SECRET, "")
        this
            .storage
            .setData(Variables.STORAGE_CLIENT_SECRET, "")
        this
            .storage
            .setData("user", "")
    }

    setupLogoutData(callback) {
        from(this.service.Logout())
            .pipe(map(body => body.data))
            .pipe(filter(item => item.status == 1))
            .subscribe({
                next: () => {
                    this.resetStorage()
                    callback(true)
                },
                error: (err) => {
                    callback(false)
                }
            })
    }

    checkTokenLogin(callback) {
        let token = this.storage.getData(Variables.STORAGE_LOGIN_SECRET)
        if(token != "") {
            setTimeout(() => {
                from(this.service.CheckToken())
                .pipe(map(body => body.data))
                .pipe(map(item => item.data))
                .subscribe({
                    next: (data) => {
                        callback(data)
                    }, error: (error) => {
                        this.resetStorage()
                        callback(error.response.data.data)
                    }
                })
            }, 120);    
        }
    }

    setupUserLogin(userData) {
        this
            .storage
            .setData("user", userData)
    }

    getDataUser() {
        return JSON.parse(this.storage.getData("user"))
    }

    setupLoginToken(tokenLogin) {
        const chipperTextLoginToken = this
            .crypto
            .encrypt(tokenLogin)
        this
            .storage
            .setData(Variables.STORAGE_LOGIN_SECRET, chipperTextLoginToken)
    }

    setupClientSecret(clientSecret) {
        const chiperText = this
            .crypto
            .encrypt(clientSecret)
        this
            .storage
            .setData(Variables.STORAGE_CLIENT_SECRET, chiperText)
    }

    getDeviceId() {
        const chipperText = this
            .storage
            .getData(Variables.STORAGE_DEVICE_ID)
        const deviceId = this
            .crypto
            .decrypt(chipperText)
        return deviceId
    }

    generateClientSecret(callback) {
        const chipperText = this
            .storage
            .getData(Variables.STORAGE_DEVICE_ID)
        const deviceId = this
            .crypto
            .decrypt(chipperText)
        from(this.clientSecret.generate(deviceId))
            .pipe(map(body => body.data))
            .pipe(filter(item => item.status == 1))
            .pipe(map(item => item.data))
            .subscribe(data => {
                if (data.client_secret) {
                    this.setupClientSecret(data.client_secret)
                    callback(true)
                }
            })
    }

    serviceGenerateClientSecret(callback) {
        const data = {
            device_id: this.getDeviceId(),
            "client_secret": process.env.WEB_API_KEY
        }
        this
            .service
            .setHeader("client-secret", process.env.WEB_API_KEY)
            
        from(this.service.ClientSecret(data))
            .pipe(map(body => body.data))
            .pipe(filter(item => item.status == 1))
            .pipe(map(item => item.data))
            .subscribe({
                next: (data) => {
                    this.setupClientSecret(data.client_secret)
                    callback(true)
                },
                error: (err) => {
                    callback(false)
                }
            })
    }

    storeLogin(params, callback) {
        params["device_id"] = this
            .auth
            .getDeviceId()
        setTimeout(() => {
            from(this.service.Login(params))
                .pipe(map(body => body.data))
                .pipe(filter(item => item.status == 1))
                .subscribe({
                    next: (data) => {
                        callback(data)
                    },
                    error: (err) => {
                        callback(err.response.data.data)
                    }
                })
        }, 200);
    }

    checkPrivilege(payload, callback){
        from(this.service.checkPrivilege(payload))
            .pipe(map(body => body.data))
            .pipe(filter(item => item.status == 1))
            .pipe(map(item => item.data))
            .subscribe({
                next: (data) => {
                    callback(data)
                },
                error: (err) => {
                    callback(err.response.data.data)
                }
            })
    }

    getPrivileges(callback){
        from(this.service.getPrivileges())
            .pipe(map(body => body.data))
            .pipe(filter(item => item.status == 1))
            .pipe(map(item => item.data))
            .pipe(map((data) => {
                data = this.addObjectArray(data)
                return data
            }))
            .subscribe(data => {
                callback(data)
            })
    }

    getIncentive(callback){
        from(this.service.getIncentive())
            .pipe(map(body => body.data))
            .pipe(filter(item => item.status == 1))
            .pipe(map(item => item.data))
            .subscribe(data => {
                callback(data)
            })
    }

    addObjectArray(data){
        var i;
        var code =  []
        var privileges = data.privileges
        for(i in privileges){
            code.push(privileges[i].code)
        }
        data.code = code
        return data
    }

    getNotification(callback){
        from(this.service.getNotification())
            .pipe(map(body => body.data))
            .pipe(filter(item => item.status == 1))
            .pipe(map(item => item.data))
            .subscribe(data => {
                callback(data)
            })
    }
}

export default Repository