import React from 'react'
import {connect} from 'react-redux'
import {generateClientSecret} from './reducers'

const mapStateToProps = ({}) => {
    return{}
}

const mapDispatchToProps = (dispatch) => {
return {
        'generateClientSecret': () => {
            dispatch(generateClientSecret())
        }
    }
}

function wrappingCheckToken(InputComponent)  {
    class ClienSetup extends React.Component {

        componentWillMount(){
            const {generateClientSecret} = this.props
            generateClientSecret()
        }

        render() {
            return (
                    <InputComponent {...this.props} />
            )
        }
    }
    return connect(mapStateToProps, mapDispatchToProps)(ClienSetup)
}

export default wrappingCheckToken