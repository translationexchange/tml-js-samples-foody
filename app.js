var express       = require('express');
var path          = require('path');
var favicon       = require('static-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var tml           = require('tml-express');

var routes        = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(tml.init({
  //host:   "https://staging-api.translationexchange.com",
  key:    "b8206d1b982a5410f34da48490d7653fe25266f16c70482ccc953fb7264547d1",
  token:  "573d1cb5d207b439abdcf1cad8ff76c56b00c275fa032a69f748b34c82613e07",
  //debug:  true,

  //host:   "http://localhost:3000",
  //key:    "c5d1005ced6df79cd2f7e78410134a68ec5546812013518a02402cfba1797eba",
  //token:  "a7277114dd64a91e3ae0b5cdb4f9ef5ad78c5eee85d511465ab08edd0cb8ab5c",

  //agent: {
  //  host:     "http://localhost:8282/dist/agent.js"
  //  //host:     "https://tools.translationexchange.com/agent/stable/agent.min.js",
  //  //cache:    100
  //}

  //cache: {
  //  adapter: "memcache",
  //  hosts: ["tememcached.yptuob.cfg.usw1.cache.amazonaws.com:11211"],
  //  namespace: "b8206d1b982a5410f34da48490d7653fe25266f16c70482ccc953fb7264547d1"
  //}

  //cache: {
  //  adapter: "memcache",
  //  hosts: ["localhost:11211"],
  //  namespace: "05afee35"
  //}

  //current_locale: 'fr',
  //current_locale: function(request) {
  //  return 'fr';
  //},

  //current_source: function() {
  //  window.location......
  //}

  // DYNAMIC SOURCES - BASED on PATH or CLASS NAME

  //current_source: {
  //  "recipe\\/[\\d]+$": 'current'
  //}
  //
  //current_source: function(request) {
  //  if (request.url.indexOf('profile/')) {
  //    return 'profile/view';
  //  }
  //  // return utils.normalizeSource(request.url);
  //},
  //
  //current_source: "BLA",
  //
  //current_source: {
  //  'recipe/:id': 'recipe/view'
  //},

  //current_user: function(request) {
  //  return;
  //}

}));

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
