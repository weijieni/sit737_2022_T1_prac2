var express = require("express")
const morgan = require('morgan');
const logger = require('./logger');
var bodyParser=require('body-parser') 
app = express();

// we set the port programmatically, in case we need to change it later
var port = 3000;

//this is where we are going to getch our html from
var root = '/public'

//tell express to use the static middleware,
app.use(express.static(__dirname + root));

// log server start
logger.info('Server Started')

// Use morgan for dynamic logging
app.use(morgan('tiny', { stream: logger.stream }));

/** bodyParser.urlencoded(options)
* Parses the text as URL encoded data (which is how browsers tend to send form data from
regular forms set to POST)
* and exposes the resulting object (containing the keys and values) on req.body */
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.get("/test",function(request,response){
    var param=request.query.username
    console.log('Get requested by '+param) 
    response.send('Thank you for requesting our Get Service')
})
app.get("/calculator",function(request,response){
    var num1 = request.query.num1
    var num2 = request.query.num2
    var operator = request.query.operator
    var result
    switch (operator) {
        case "add":
            result = parseInt(num1) + parseInt(num2)
            break;
        case "subtract":
            result = parseInt(num1) - parseInt(num2)
            break;
        case "multiply":
            result = parseInt(num1) * parseInt(num2)
            break;
        case "divide":
            result = parseInt(num1) / parseInt(num2)
            break;
        default:
            break;
    }
    response.send('The result is: ' + result)
})
app.post('/test',function(request,response){ 
    console.log(request.body)
    var data = request.body
    console.log('Post requested, here is the data :' + JSON.stringify(data)) 
    response.send('Thank you for requesting our Post Service')
})

//start the app and listen to the port
app.listen(port); 
console.log("Listening on port ", port);