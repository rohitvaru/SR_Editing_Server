const express = require('express')
const app = express()
const path = require('path')


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')))
// middleware --> function that has access to the request object (req), the response object (res), and the next function in the application’s request-response cycle.
app.use(function (req, res, next) {
    console.log(req.url)
    console.log('Time:', Date.now())
    next()
})
app.use(function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
})

// routes --> routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
// Each route can have one or more handler functions, which are executed when the route is matched.
app.get('/', function (req, res) {
    res.send('Hello World')
})
app.get('/about', function (req, res) {
    res.send('Hello world I am your User Page')
})
app.get('/profile', function (req, res) {
    res.send('Hello world I am your profile Page')
})

// Error-handling middleware always takes four arguments.
app.get('/work', function (req, res,next) {
    res.send('Hello world I am your work Page')
    // return next(new Error('BROKEN CODE>>>>>')) // Express will catch this on its own.
})
// defualt error handler
app.use((err,req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
app.listen(3000)