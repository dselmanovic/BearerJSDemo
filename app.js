var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
var bearer = require('bearer');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Setup authentication
//This should be done before all routes are configured to assure that authorization will be first to execute
bearer({
    //Make sure to pass in the app (express) object so we can set routes
    app:app,
    //Please change server key for your own safety!
    serverKey:"12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678",
    tokenUrl:'/token', //Call this URL to get your token. Accepts only POST method
    createToken:function(req){
        //If your user is not valid just return "underfined" from this method.
        //Your token will be added to req object and you can use it from any method later
        var username=req.body.username;
        var userValid=true; //You are aware that this is where you check username/password in your DB, right!?
        if (userValid) return({
            expire: moment(Date.now()).add('days', 1).format('YYYY-MM-DD HH:mm:ss'),
            username: username,
            contentType: req.get('Content-Type'),
            ip: req.ip,
            userAgent: req.header('user-agent'),
            custom_id: '55555',
            another: 'Some data you need in your token',
            moreData: 'Some more data you need'
        });
        return undefined;
    },
    validateToken:function(req, token){
        //you could also check if request came from same IP using req.ip==token.ip for example
        if (token){
            return moment(token.expire)>moment(new Date());
        }
        return false;
    },
    onTokenValid:function(token){
        //This is in case you would like to check user account status in DB each time he attempts to do something.
        //Doing this will affect your performance but its your choice if you really need it
        //Returning false from this method will reject user even if his token is OK
        return true;
    },
    onAuthorized: function(req, token){
        console.log("this will be executed if request is OK");
    },
    onUnauthorized: function(req, token){
        console.log("this will be executed if request fails authentication");
    },
    secureRoutes:[
        {url:'/secure', method:'get'},
        {url:'/secure/*', method:'get'}
    ]
});

//Setup routing
var routeConfig = require('./routes/route-config')(app);

module.exports = app;
