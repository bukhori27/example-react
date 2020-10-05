import '@babel/polyfill'
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {LocaleProvider} from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'
import {history, store} from '@example/store'
import Application from './component/application.jsx'

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import '../components/resources/AntStyles/AntDesign/antd.cleanui.scss'
import '../components/resources/CleanStyles/Core/core.cleanui.scss'
import '../components/resources/CleanStyles/Vendors/vendors.cleanui.scss'

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <LocaleProvider locale={enGB}>
                <Application/>
            </LocaleProvider>
        </ConnectedRouter>
    </Provider>, 
document.getElementById("application"))
if (process.env.NODE_ENV == 'production') {
    // Check that service workers are supported
    if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw-example.js');
        });
    }
}