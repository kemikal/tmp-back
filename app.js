var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');

var express = require('express')
var cors = require('cors')

var usersRouter = require('./routes/users');

var app = express();

app.use(cors())

let list = [
    {userId: 1, name: 'John', age: 20},
    {userId: 2, name: 'Mary', age: 30},
    {userId: 3, name: 'Mike', age: 40},
    {userId: 4, name: 'Adam', age: 50}
]

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {index: false}));

app.use('/users', usersRouter);

const htmlHead = '<link rel="stylesheet" href="/stylesheets/style.css"><title>Hello world</title><script src="/js/script.js" defer></script>';

app.use("/", (req, res, next) => {
    console.log("Middleware does this");
    next();
})

app.use((req, res, next) => {
    console.log("ALL THE PATHS!");
    next();
})

app.get("/", function(req, res, next) {
    console.log("Then this!");
    res.send(htmlHead + "<h1 id='pageHeader'>Hello World!</h1><ul id='userList'></ul>");
});

// app.get("/test", (err, req, res, next) => {
//     if(err) {
//     console.log("This is the error middleware", err);
//     }
//     res.send("all ok! ")
// })

app.get("/json", (req, res, next) => {
    fs.readFile("users.json", (err, data) => {
        if (err) {
            console.log("Error: ", err);
        }
        let users = JSON.parse(data);
        res.json(users);
    })   
 });

app.get("/jsonWrite", (req, res, next) => {

        // HÄMTA
        fs.readFile("users.json", (err, data) => {
        if (err) {
            console.log("Error: ", err);
        }
        let users = JSON.parse(data);
        });

        // ÄNDRA
        users.push({userId: 5, name: 'John', age: 20});

        // SPARA
        fs.writeFile("users.json", JSON.stringify(list), (err) => { 
            if (err) {
                console.log("Error: ", err);
            }
        res.send("File written!");
    })
});


app.get("/list", function(req, res, next) {

    res.json(list);
});

app.get("/next/:hej", (req, res, next) => {
    console.log("First middleware");

    let hej = req.params.hej;
    
    if (hej == "janne") {
     next(); 
    } 
    else {
        res.send("Och vem är du?");
    }

},
    ((req, res) => {

    let hej = req.params.hej;

    console.log("In next");
    res.send("Hej " + hej);
}))

module.exports = app;
