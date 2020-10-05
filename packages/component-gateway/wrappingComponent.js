import React from 'react'
import Page from './index'

function wrappingComponent(InputComponent)  {
    return class extends React.Component {
        render() {
            return (
                <Page>
                    <InputComponent {...this.props} />
                </Page>
            )
        }
    }
}
export default wrappingComponent