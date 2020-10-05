import {createAction, createReducer} from 'redux-act'
import {push} from 'react-router-redux'

export const setIsLoginValue = createAction("@@EXAMPLE_MITRA_SET_IS_LOGIN_VALUE")
export const setUserData = createAction("@@EXAMPLE_MITRA_USER_DATA")
export const setLoginLoading = createAction("@@EXAMPLE_MITRA_LOADING_LOGIN")
export const setPrivileges = createAction('@@EXAMPLE_MITRA_SET_PRIVILEGES')
export const setIncentiveUser = createAction('@@EXAMPLE_MITRA_SET_INCENTIVE_USER')
export const setNotificationUser = createAction('@@EXAMPLE_MITRA_SET_NOTIFICATION_USER')

export const redirectForgot = () => (dispatch) => {
    dispatch(push("/pin/forgot"))
}

export const logout = () => (dispatch) => {
    let repository = new Repository
    repository.setupLogoutData((flag) => {
        if (flag) {
            dispatch(setLoginLoading(false))
            dispatch(openNotificationSuccess("Berhasil Keluar"))
            dispatch(push("/login"))
        } else {
            dispatch(openNotificationError("Gagal"))
        }
    })
}


export const storeLogin = (values) => (dispatch) => {
    dispatch(setLoginLoading(true))
    let repository = new Repository
    const params = {
        username: values.username,
        password: values.password
    }
    repository.storeLogin(params, (data) => {
        if (data.errors) {
            dispatch(openNotificationError("Gagal", data.errors[0]))
            dispatch(setLoginLoading(false))
        } else {
            dispatch(setLoginLoading(false))
            dispatch(openNotificationSuccess("Login Berhasil"))
            repository.setupLoginToken(data.token.value)
            repository.setupUserLogin(JSON.stringify(data.data.user))
            dispatch(setUserData(data.data.user))
            dispatch(push("/dashboard"))
            dispatch(getPrivileges())
        }
    })
}

export const getPrivileges = () => (dispatch) => {
    let repository = new Repository
    repository.getPrivileges((data) => {
        if(data != null) {
            dispatch(setPrivileges(data.code))
        }
    })
}

export const getIncentive = () => (dispatch) => {
    let repository = new Repository
    repository.getIncentive((data) => {
        if(data != null) {
            dispatch(setIncentiveUser(data.incentive))
        }
    })
}

export const checkTokenLogin = () => (dispatch) => {
    let repository = new Repository
    repository.checkTokenLogin((data) => {
        if(data.errors){
            dispatch(push("/login"))
        }else{
            console.log("success")
        }
    })
}

export const checkPrivilege = (payload) => (dispatch) => {
    let repository = new Repository
    repository.checkPrivilege(payload, (data) => {
        if(data.errors){
            dispatch(openNotificationError("Anda tidak bisa mengakses halaman ini"))
            dispatch(push("/dashboard"))
        }
    })
}

export const getNotification = () => (dispatch) => {
    let repository = new Repository
    repository.getNotification((data) => {
        if(data != null) {
            dispatch(setNotificationUser(data.notification))
        }
    })
}

export const dumpDataUser = () => (dispatch) => {
    let repository = new Repository
    const user = repository.getDataUser()
    dispatch(setUserData(user))
}

export const actionTypes = {
    SET_IS_LOGIN_VALUE: 'SET_IS_LOGIN_VALUE',
    SET_USER_DATA: 'SET_USER_DATA'
}

const initialState = {
    isLogin: "",
    user: "",
    tokenLogin: "",
    loadingLogin: false,
    privileges: [],
    incentive: null,
    notification: null,
}

export default createReducer({
    [setNotificationUser]: (state, notification) => ({
        ...state, 
        notification
    }),
    [setIsLoginValue]: (state, isLogin) => ({
        ...state,
        isLogin
    }),
    [setUserData]: (state, user) => ({
        ...state,
        user
    }),
    [setLoginLoading]: (state, loadingLogin) => ({
        ...state,
        loadingLogin
    }),
    [setPrivileges]: (state, privileges) => ({...state, privileges}),
    [setIncentiveUser]: (state, incentive) => ({...state, incentive})
}, initialState)