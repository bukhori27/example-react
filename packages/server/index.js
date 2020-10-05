require('dotenv').config()
var cookieParser = require('cookie-parser');
var csrf = require('csurf');
var bodyParser = require('body-parser');
var session = require('express-session');
const axios = require('axios');

const express = require('express');
let app = express();
const expressNunjucks = require('express-nunjucks');
const fs = require('fs');

const isDev = process.env.APP_ENV != 'production';
const path = require('path');

app.set('views', __dirname);

const PublicPath = "./public";

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(csrf({cookie: true}))

app.use(express.static(PublicPath))
expressNunjucks(app, {
    watch: isDev,
    noCache: isDev
});

let gaAppApiKey  = process.env.GA_APP_API_KEY;
let gaAppAuthDomain = process.env.GA_APP_AUTH_DOMAIN;
let gaAppDatabaseUrl  = process.env.GA_APP_DATABASE_URL;
let gaAppProjectID  = process.env.GA_APP_PROJECT_ID;
let gaAppStorageBucket = process.env.GA_APP_STORAGE_BUCKET;
let gaAppMessagingSenderId = process.env.GA_APP_MESSAGING_SENDER_ID;
let gaAppId = process.env.GA_APP_ID;
let gaAppMeasurementId = process.env.GA_APP_MEASUREMENT_ID;
let url_orders = process.env.ORDERS_HOST;

let pathIndexHtml = 'index.html';

if (process.env.NODE_ENV == 'production') {
    pathIndexHtml = '../../public/index.html';
}

if (process.env.APP_ENV == 'production') {
    pathIndexHtml = '../../public/output.html';    
}

if (process.env.APP_ENV == 'staging') {
    pathIndexHtml = '../../public/output.html';
}
var url_lannister = process.env.LANNISTER_HOST
var RedisStore = require('connect-redis')(session);
var maxAge = 100 * 60 * 60 * 24 * 3
app.use(session({
    store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        db: parseInt(process.env.REDIS_DB)
    }),
    secret: '@@EXAMPLE_MITRA_WHOLESALE_WEB_VIEW', 
    cookie: {maxAge: maxAge}
}))

var mysql      = require('mysql');

/** 
 * Function to check on token login, this function will be called in middleware 
 * TODO: 
 * - Clean up these console log in the future
 * - Make this code more clean
 * FIXME: Remove get token from query
 * @return function
 **/
function authMiddlewareLogin (req, res, next) {
    const headers = req.headers;
    const sourceFrom = req.query.source;
    let authToken = headers['authorization'] || headers['m-token'] || headers['m_token'];
    let appVersionCodeheaders = headers['app-version-code'];
    let appVersionSourceheaders = headers['app-version-source'];
    let appVersionCodesession = req.session.appVersionCode;
    let appVersionSourcesession = req.session.appVersionSource;
    let appversioncodequery= req.query.appversioncode
    let appversionsourcequery= req.query.appversionsource
    let authTokenLogin = ''
    console.log("Auth TOKEN HEADER : ")
    console.log(authToken)
    if (sourceFrom == 'pos' || req.session.appVersionSource == 'pos-android') {
        authToken = undefined;
    }
    if(appVersionCodesession === null || appVersionCodesession === undefined || appVersionCodesession === ''){
        if(appVersionCodeheaders === null || appVersionCodeheaders === undefined || appVersionCodeheaders === ''){
            if(!req.query.appversioncode) {
                req.session.appVersionCode = 0;
                req.session.appVersionSource = 0;
            }else {
                req.session.appVersionCode = appversioncodequery;
                req.session.appVersionSource = appversionsourcequery;
            }
        }
        else {
            req.session.appVersionCode = appVersionCodeheaders;
            req.session.appVersionSource = appVersionSourceheaders;
        }
    }else {
        if(appVersionCodeheaders === null || appVersionCodeheaders === undefined || appVersionCodeheaders === ''){
            if(appversioncodequery === null || appversioncodequery === undefined || appversioncodequery === '') {
                req.session.appVersionCode = appVersionCodesession;
                req.session.appVersionSource = appVersionSourcesession;
            }else {
                req.session.appVersionCode = appversioncodequery;
                req.session.appVersionSource = appversionsourcequery;
            }
        } else {
            req.session.appVersionCode = appVersionCodeheaders;
            req.session.appVersionSource = appVersionSourceheaders;
        }
    }
    if (req.query.token && req.query.source === 'pos') {
        console.log("Get Data from URL query  : ")
        console.log(req.query)
        authToken = req.query.token;
        req.session.appVersionSource = 'pos-android'
    }
    if (!authToken) {
        console.log("Get Data from URL query  : ")
        console.log(req.query)
        authToken = req.query.token;
    } else if(req.session.appVersionSource != 'pos-android') {
        authToken = authToken.replace("Bearer ", "");
    }
    console.log("Auth Token after : ")
    console.log(authToken)
    authTokenLogin = req.session.tokenLogin;
    let merchantId = req.session.merchantId;
    console.log("Auth TOKEN SESSION : ")
    console.log(authTokenLogin)
    console.log("MERCHANT ID")
    console.log(merchantId)
    console.log(authToken)

    if((authToken !== undefined && authToken !== '') && authToken != authTokenLogin){
        authTokenLogin = ""
        merchantId = ""
    }

    if (!authTokenLogin && !merchantId) {
        const connection = mysql.createConnection({
            host     : process.env.DB_HOST,
            user     : process.env.DB_USERNAME,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE,
            port : process.env.DB_PORT
        });
        connection.connect();
        connection.query("select  m.id as merchant_id, api_token, subdomain, code, api_secret_key,  " +
        "o.id as outlet_id from merchant_tokens mt, outlets o, merchants m where o.merchant_id = mt.merchant_id and m.id = mt.merchant_id and api_token =  '"+authToken+"' limit 1" , (error, results) => {
            console.log("Error from query to database : ")
            console.log(error)
            console.log("Result Query : ")
            console.log(results)
            if (error == null && results.length > 0) {
                const data = results[0];
                const merchantId = data.merchant_id;
                const apiToken = data.api_token;
                req.session.tokenLogin = apiToken
                req.session.outletCode = data.code;
                req.session.subdomain = data.subdomain;
                req.session.apiSecretKey = data.api_secret_key;
                req.session.merchantId = merchantId
                next();
            } else {
                if (req.session.appVersionCode > 0) {
                    AndroidFunction.logEvent("screen_ws_not_authorized");
                }
                res.status(403).send("not authorized");
            }
        });
        connection.end();
    } else {
        next();
    }
}

const getHtml = () => fs.readFileSync(path.join(__dirname, pathIndexHtml), 'utf8')
    .replace('{{{bundle_js}}}', '/bundle.js')
    .replace('{{{sdk_lannister}}}', process.env.SDK_LANNISTER)
    .replace('{{{gaAppApiKey}}}', gaAppApiKey)
    .replace('{{{gaAppAuthDomain}}}', gaAppAuthDomain)
    .replace('{{{gaAppDatabaseUrl}}}', gaAppDatabaseUrl)
    .replace('{{{gaAppProjectID}}}', gaAppProjectID)
    .replace('{{{gaAppStorageBucket}}}', gaAppStorageBucket)
    .replace('{{{gaAppMessagingSenderId}}}', gaAppMessagingSenderId)
    .replace('{{{gaAppId}}}', gaAppId)
    .replace('{{{gaAppMeasurementId}}}', gaAppMeasurementId)
    .replace('{{{bundle_styling}}}', '/bundle.css');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, csrf-token, Authorization");
    next();
});

app.get("*", authMiddlewareLogin, (req, res) => {
    let htmlRaw = getHtml();
    let httpUri = "https://"
    
    if (isDev) {
        httpUri = "http://"
    }

    const headers = req.headers;
    let authToken = req.session.tokenLogin
    let appVersionCode = req.session.appVersionCode
    let appVersionSource = req.session.appVersionSource
    let outletCode = req.session.outletCode
    let merchantId = req.session.merchantId
    let subdomain = req.session.subdomain;
    let apiSecretKey = req.session.apiSecretKey;
    console.log("Auth TOKEN : ")
    console.log(authToken)
    console.log("App Version Code : ")
    console.log(appVersionCode)
    console.log("App Version source : ")
    console.log(appVersionSource)
    const fullBaseUrl = httpUri + headers.host
    let clientSecret = process.env.WEB_API_KEY
    console.log(fullBaseUrl)
    htmlRaw = htmlRaw.replace('{{{csrfToken}}}', authToken)
        .replace('{{{baseUrl}}}', fullBaseUrl)
        .replace('{{{urlLannister}}}', url_lannister)
        .replace('{{{appVersionCode}}}', appVersionCode)
        .replace('{{{outletCode}}}', outletCode)
        .replace('{{{appVersionSource}}}', appVersionSource)
        .replace('{{{merchantId}}}', merchantId)
        .replace('{{{clientSecret}}}', clientSecret)
        .replace('{{{apiSecretKey}}}', apiSecretKey)
        .replace('{{{subdomain}}}', subdomain)
        .replace('{{{urlOrders}}}', url_orders);
    res.send(htmlRaw);
    return
});

let runningPort = 3000;

if (process.env.APP_PORT) {
    runningPort = process.env.APP_PORT;
}

app.listen(runningPort, () => console.log('Example app listening on port ' + runningPort +'! '));
