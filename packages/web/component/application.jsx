import React from 'react'
import PropTypes from 'prop-types'
import {ContainerQuery} from 'react-container-query'
// import { withLDProvider } from 'launchdarkly-react-client-sdk';
import classNames from 'classnames'
import Content from '@example/mitra-content'

const query = {
    'screen-xs': {
        maxWidth: 575
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599
    },
    'screen-xxl': {
        minWidth: 1600
    }
}

let contentBuffer = {
    pathName: null,
    content: null,
}

class Application extends React.Component {
    static childContextTypes = {
        getContentBuffer: PropTypes.func,
        setContentBuffer: PropTypes.func,
    }

    getChildContext() {
        return {
            getContentBuffer: () => contentBuffer,
            setContentBuffer: ({ pathName, content }) => (contentBuffer = { pathName, content }),
        }
    }

    render() {
        return (
            <ContainerQuery query={query}>
                {params => (
                    <div className={classNames(params)}>
                        <Content />
                    </div>
                )}
            </ContainerQuery>
        )
    }
}
// export default withLDProvider({ clientSideID: '5d6c8ceac6d4d8087c0a8109' })(Application);
export default Application