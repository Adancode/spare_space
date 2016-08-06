var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

// This says that if we do root or /, we mean to look in the public folder.
app.use(express.static(__dirname + '/'));
console.log(__dirname);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(3000);
