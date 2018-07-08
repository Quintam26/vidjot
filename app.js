const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//Load routes
const ideas = require('./routes/ideas');

//Connect to moongose
mongoose.connect('mongodb://localhost/vidjot-dev', {
      
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));



//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Metheod-override middleware
app.use(methodOverride('_method'));

//Express-session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }));

//Connect-flash middleware
app.use(flash());

//Global variables for messages...middleware
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Index Route
app.get('/', (req, res) => {
    const title = 'Welcome';
    res.render('index', {
        title: title
    });
});

//About Route
app.get('/about', (req, res) => {
    res.render('about');
});

//User login route
app.get('/users/login', (req, res) => {
    res.send('login');
});

//User register route
app.get('/users/register', (req, res) => {
    res.send('register');
})

//Use routes
app.use('/ideas', ideas);

const port = 5000;

app.listen(port, () =>{
    console.log(`Server Started on port ${port}`)
});