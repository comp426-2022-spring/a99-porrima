// Used for spinning up the server
const express = require('express')
const app = express()

// Get routes
const routes = require('./src/routes/router')

// Create access log file
const morgan = require("morgan");
const fs = require("fs");
const accessLog = fs.createWriteStream("./data/log/access.log", { flags: "a" });
app.use(morgan("combined", { stream: accessLog }));

app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(express.static('./public'))
app.use('/', routes)

const args = require("minimist")(process.argv.slice(2));

const port = args.port || process.env.PORT || 3000;

let appServer = app.listen(port, () => {
    console.log(`Server is runnning on port: ${port}`)
})

function stop() {
    appServer.close();
  };

module.exports = app
module.exports.stop = stop

// FOR TESTING
// curl --data "email=thegilmores.matt@gmail.com&username=mattsg&password=abc123" http://localhost:3000/app/new/user
// curl -X DELETE "localhost:3000/app/delete/user/iamfake"
// curl -X PATCH http://localhost:3000/app/update/user/mattsg -H "Content-Type: application/json" -d '{"username":"matthew","password":"abc123","email":"mgilmore@katchdata.com"}'
