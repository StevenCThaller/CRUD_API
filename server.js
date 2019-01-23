var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-flash');
var app = express();

app.use(express.static(__dirname+'/public/dist/public'));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'benderrod',
    resave : false,
    saveUninitialized : true,
    cookie : { maxAge : 60000 }
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


require('./routes')(app);

app.listen(8000, function() {
    console.log("Listening on port 8000");
})