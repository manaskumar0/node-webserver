const  express = require('express');

const hbs = require('hbs');

const fs = require('fs');

//environment variable
const port = process.env.PORT || 3000;

var app = express();


//partials //for dynamic web page
hbs.registerPartials(__dirname + '/views/partials');

//helper
hbs.registerHelper('getcurrentyear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamit',(text) => {
     return text.toUpperCase();
});

//for dynamic web page
app.set('view engine', 'hbs');

//for static web page
app.use(express.static(__dirname + '/public'));


//middleware

app.use((req, res, next) => {
    var now = new Date().toString();

    var log =`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log',log + '\n');

   next();
});

//for all pages this page is going to load because of next is not call in the below code
//it is use in a linear manner so the static web pages are run

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//
// })

app.get('/', (request, response) => {

        //response.send('<h1>Hello We are going to learn webserver</h1>');
    //for dynamic web page
        response.render('home.hbs',{
            welcomemsg:'Hello WelCome to My Node Render Website',
            pagetitle: 'Home Page',
            currentyear: new Date().getFullYear()
});
});

app.get('/about', (req, res) => {
        res.render('about.hbs',{
            pagetitle: 'About Page',
            currentyear: new Date().getFullYear()
});
});

app.get('/mine', (req,res) => {
        res.send("<h1>Bad Request</h1>");
});
//wer have to add listener

//environment variable

app.listen(port,() => {console.log(`${port}`)});