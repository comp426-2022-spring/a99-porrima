const log_db = require("../database/database_accesslogs");

const log = (req, res, next) => {
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
    referer: req.headers["referer"],
    useragent: req.headers["user-agent"],
  };
  const stmt =
    log_db.prepare(`INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, 
        protocol, httpversion, secure, status, referer, useragent) VALUES (?,?,?,?,?,?,?,?,?,?,?)`);
  const info = stmt.run(
    String(logdata.remoteaddr),
    String(logdata.remoteuser),
    String(logdata.time),
    String(logdata.method),
    String(logdata.url),
    String(logdata.protocol),
    String(logdata.httpversion),
    String(logdata.secure),
    String(logdata.status),
    String(logdata.referer),
    String(logdata.useragent)
  );
  next();
};

const notFound = (req, res, next) => {
  res.status(404);
  res.json({ message: "Endpoint not found (404)" });
  next();
};

module.exports = { log, notFound };
