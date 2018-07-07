const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//Connect to moongose
mongoose.connect('mongodb://localhost/vidjot-dev', {
      
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

//Load idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

//Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
})

//Add Idea Form
app.get('/ideas/add', (req, res) => {
    res.render('ideas/add');
})

//Process form
app.post('/ideas', (req, res) => {
    console.log(req.body);
    res.send('ok');
})
const port = 5000;

app.listen(port, () =>{
    console.log(`Server Started on port ${port}`)
});