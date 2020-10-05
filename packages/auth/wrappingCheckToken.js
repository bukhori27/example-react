import React from 'react'
import {connect} from 'react-redux'
import {
    checkTokenLogin, 
    checkPrivilege,
    getIncentive,
    getNotification
} from './reducers'

const mapStateToProps = ({}) => {
    return{}
}

const mapDispatchToProps = (dispatch) => {
return {
        'checkTokenLogin': () => {
            dispatch(checkTokenLogin())
        },
        'checkPrivilege': (value) => {
            dispatch(checkPrivilege(value))
        }, 
        'getIncentive': () => {
            dispatch(getIncentive())
        },
        'getNotification': () => {
            dispatch(getNotification())
        }
    }
}

function wrappingCheckToken(InputComponent)  {
    class CheckLogin extends React.Component {

        componentWillMount(){
            const {checkTokenLogin, checkPrivilege, getIncentive, getNotification} = this.props
            checkTokenLogin()

            const hrefLocation = window.location.href
            const arr = hrefLocation.match(/\/#\/(.*)/g) 
            const currentUrlPath = arr[0].replace("/#/", "")
            const splitUrl = currentUrlPath.split("/")
            let code = ""
            if(splitUrl[0] === "user" || splitUrl[0] === "group"){
                code = "setting"
            }else{
                code = splitUrl[0]
            }
            let payload = {
                code: code
            }
            checkPrivilege(payload)
            getIncentive()
            getNotification()
        }

        render() {
            return (
                    <InputComponent {...this.props} />
            )
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(CheckLogin)
}

export default wrappingCheckToken