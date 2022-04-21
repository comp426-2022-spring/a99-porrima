// Used for spinning up the server
const express = require('express')
const app = express()

// Get routes
const routes = require('./src/routes/router')

// Cors
const cors = require('cors')

// Create access log file
const morgan = require("morgan");
const fs = require("fs");
const accessLog = fs.createWriteStream("./data/log/access.log", { flags: "a" });
app.use(morgan("combined", { stream: accessLog }));

app.use(cors())
app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(express.static('./porrima-app'))
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