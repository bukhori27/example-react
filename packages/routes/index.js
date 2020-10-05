import React from 'react'
import {Switch, Route, Router} from 'react-router-dom'
import Loadable from 'react-loadable'
import componentGateway from '@example/component-gateway'
import ListRoute from './list'

const loadable = loader => Loadable({
    loader,
    delay: false,
    loading: () => null
})

const loadableRoutes = ListRoute
class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact key="/" path="/" component={componentGateway} />
                {Object
                    .keys(loadableRoutes)
                    .map(path => {
                        const {
                            exact,
                            ...props
                        } = loadableRoutes[path]
                        props.exact = exact === void 0 || exact || true
                        return <Route key={path} path={path} {...props}/>
                    })}
                    <Route
                        render={() => (
                            <h1>Page Not Found!</h1>
                        )}
                    />
            </Switch>
        )
    }
}
export {loadableRoutes}
export default Routes
