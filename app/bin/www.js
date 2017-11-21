"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const http = require("http");
const https = require("https");
const fs = require("fs");
var key = fs.readFileSync("../../../private.key");
var cert = fs.readFileSync("../../../primary.crt");
var ca = fs.readFileSync("../../../server.crt");
var SSLoptions = {
    key: key,
    cert: cert,
    ca: ca
};
https.createServer(SSLoptions, app_1.default).listen(443);
const port = normalizePort(process.env.PORT || 3000);
app_1.default.set("port", port);
var server = http.createServer(app_1.default);
server.listen(port, onListening);
server.on("error", onError);
app_1.default.use(function (req, res, next) {
    if (req.secure) {
        next();
    }
    else {
        res.redirect("https://" + req.headers.host + req.url);
    }
});
function normalizePort(val) {
    let port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall != "listen") {
        throw error;
    }
    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + "requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + "is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("Listening on " + bind);
}
//# sourceMappingURL=www.js.map