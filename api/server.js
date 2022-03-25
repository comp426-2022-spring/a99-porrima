// Used for spinning up the server
const express = require('express')
const app = express()

// Make Express use its own built-in body parser for both urlencoded and JSON body data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Requiring both databases //
// Log database
const log_db = require('./database/database_accesslogs.js')
// User database
const user_db = require('./database/database_user.js')

// Using md5 for hashing salt and passwords
const md5 = require('md5')

// We can use minimist in the future if that's easier; this is just for testing and default
const port = 3000

app.listen(port, () => {
    console.log(`Server is runnning on port: ${port}`)
})

// Base API endpoint
app.get('/app', (req, res) => {
    res.statusCode = 200
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

// Middleware for querying to access log database
app.use((req, res, next) => {
    let logdata = {
      remoteaddr: req.ip,
      remoteuser: req.user,
      time: Date.now(),
      method: req.method,
      url: req.url,
      protocol: req.protocol,
      httpversion: req.httpVersion,
      secure: req.secure,
      status: res.statusCode,
      referer: req.headers['referer'],
      useragent: req.headers['user-agent']
    }
    const stmt = log_db.prepare(`INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, 
      protocol, httpversion, secure, status, referer, useragent) VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
    const info = stmt.run(String(logdata.remoteaddr), String(logdata.remoteuser), String(logdata.time), 
      String(logdata.method), String(logdata.url), String(logdata.protocol), String(logdata.httpversion), 
      String(logdata.secure), String(logdata.status), String(logdata.referer), String(logdata.useragent))
      next()
  })

// Used for debugging access log database
app.get('/app/log/access', (req, res) => {
    try{
        const stmt = log_db.prepare('SELECT * FROM accesslog').all()
        res.status(200).json(stmt)
        } catch (e) {
        console.error(e)
    }
})

// API endpoint for new user
// HAVE TO MAKE SURE USERNAME ISN'T IN DATABASE ALREADY
app.post('/app/new/user', (req, res) => {
    let salt = md5(Math.random())
    let user_info = {
        email: req.body.email,
        user_n: req.body.username,
        pass: md5(req.body.password + String(salt)),
        salt: salt
    }
    try {
        const stmt = user_db.prepare('INSERT INTO user (email, username, password, salt) VALUES(?,?,?,?)')
        const info = stmt.run(user_info.email, user_info.user_n, user_info.pass, user_info.salt)
        res.status(200).json(info)
    } catch (e) {
        console.error(e)
    }
})

// API endpoint for debugging user database
app.get('/app/user/exists', (req, res) => {
    try {
        const stmt = user_db.prepare('SELECT * FROM user').all()
        res.status(200).json(stmt)
    } catch (e) {
        console.error(e)
    }
})

// API endpoint for user signing in
app.get('/app/user/signin', (req, res) => {
    let sign_in = false
    try {
        const stmt = user_db.prepare('SELECT * FROM user WHERE username = ?')
        const info = stmt.run(req.body.username)
        if(String(info.password) == String(md5(req.body.password + info.salt))) {
            sign_in = true
        } 
        res.status(200).json({"signed_in": "true"})
    } catch (e) {
        console.error(e)
    }
})

// Nonexistent API handling
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
    res.type("text/plain")
})