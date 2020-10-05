import {createAction, createReducer} from 'redux-act'
import { notification } from 'antd'

import Helper from "@example/helper";
export const setShowNotification = createAction("@@EXAMPLE_CRM_SET_SHOW_NOTIFICATION")

const helper = new Helper;
export const openNotificationSuccess = (message, description) => (dispatch) => {
    notification['success']({
        message: message,
        description: description,
        duration:3
    })
}

export const openNotificationError = (message, description) => (dispatch) => {
    notification['error']({
        message: helper.replaceTagHTMLTotext(message),
        description: description,
        duration:3
    })
}
export const openNotificationErrorStore = (message, description) => (dispatch) => {
    notification['error']({
        message: message,
        description: description,
        duration:3
    })
}
const initialState = {
   success: false,
   error: false,
   show: false
}

export default createReducer({  
    [setShowNotification]: (state, show) => ({...state, show})
}, initialState)