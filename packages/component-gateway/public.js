import React from 'react'
import {connect} from 'react-redux'

const mapStateToProps = ({routing, security}, ownProps) => {
    return {
        currentURL: routing.location != null ? routing.location.pathname : "/",
        clientSecretKey: security.clientSecret
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
}

class ComponentGatewayPublic extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props
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
)(ComponentGatewayPublic)
