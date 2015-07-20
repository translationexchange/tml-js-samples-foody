var express       = require('express');
var path          = require('path');
var favicon       = require('static-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var tml           = require('tml-express');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('PR', process.env.PR || 'false');


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

if (app.get('PR') === 'true') {
    app.use(tml.init("573d1cb5d207b439abdcf1cad8ff76c56b00c275fa032a69f748b34c82613e07", {}));
}
else {
    app.use(tml.init("573d1cb5d207b439abdcf1cad8ff76c56b00c275fa032a69f748b34c82613e07", {

        //cache: {
        //  adapter: "memcache",
        //  hosts: ["localhost:11211"],
        //  namespace: "573d1cb5d"
        //}

        cache: {
            adapter: "memcache",
            hosts: ["tememcached.yptuob.cfg.usw1.cache.amazonaws.com:11211"],
            namespace: "573d1cb5d"
        }

//app.use(tml.init("10378fe12f942b104cb00890255dae915f2bc2a4f8ba467a70e3d7d6801cb418", {
//  host: "http://localhost:3000",
//
//  cache: {
//    adapter: "memcache",
//    hosts: ["localhost:11211"],
//    namespace: "10378fe12"
//  }

        //current_locale: 'fr',
        //current_locale: function(request) {
        //  return 'fr';
        //},

        //current_source: {
        //  "recipe\\/[\\d]+$": 'current'
        //}

        //current_source: function(request) {
        //  if (request.url.indexOf('profile/')) {
        //    return 'profile/view';
        //  }
        //  // return utils.normalizeSource(request.url);
        //},

        //current_source: "BLA",

        //current_source: {
        //  'recipe/:id': 'recipe/view'
        //},

        //current_user: function(request) {
        //  return;
        //}

    }));
}


app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
