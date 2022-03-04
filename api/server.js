const express = require('express')
const app = express()

const port = 3000

app.listen(port, () => {
    console.log(`Server is runnning on port: ${port}`)
})

app.get('/app', (req, res) => {
    res.statusCode = 200
    res.statusMessage = 'OK';
    res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
    res.end(res.statusCode+ ' ' +res.statusMessage)
})

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
    res.type("text/plain")
})