import React from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Auth from '@example/auth'
import {dumpDataUser} from '@example/auth/reducers'

const mapStateToProps = ({routing, security}) => {
    return {
        currentURL: routing.location != null ? routing.location.pathname : "/",
        clientSecretKey: 'mitra',
        currentPathName: routing.location != null ? routing.location.pathname : "/"
    }
}

const mapDispatchToProps = (dispatch) => {    
    return {
        dispatch: dispatch
    }
}

class ComponentGateway extends React.Component {
    componentDidMount() {
        const {dispatch, currentPathName} = this.props
        const auth = new Auth
        const header = auth.headerLogin()
        if (!header["Authorization"] || header["Authorization"] == "") {
            dispatch(push("/login"))
        } else {
            const hrefLocation = window.location.href
            const arr = hrefLocation.match(/\/#\/(.*)/g) 
            const currentUrlPath = arr[0]
            dispatch(setShowMenuState(true))
            dispatch(dumpDataUser())
            if (currentUrlPath != "/#/") {
                dispatch(push(currentUrlPath.replace("/#", "")))
            } else {
                dispatch(push("/dashboard"))
            }
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ComponentGateway)
export WrappingComponent from './wrappingComponent'
