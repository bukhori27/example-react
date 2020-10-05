import Reducer from "./reducers"
import createHistory from 'history/createHashHistory'
import {routerMiddleware} from 'react-router-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import {createStore, applyMiddleware} from 'redux'

export const history = createHistory()
const router = routerMiddleware(history)
const initiateMiddlewares = [router, thunk]

export const store = createStore(Reducer, composeWithDevTools(
        applyMiddleware(
            ...initiateMiddlewares            
        )
    )
)