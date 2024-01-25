
const next = require("next");
const fs = require("fs");
const { createServer } = require("https");
const http = require("http");
const { parse } = require("url");

const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync("./privkey.pem"),
    cert: fs.readFileSync("./fullchain.pem"),
};

const port = 443
app.prepare().then(() => {
    // Create HTTP server
    http.createServer((req, res) => {
        const host = req.headers.host;
        res.writeHead(301, { Location: `https://${host}${req.url}` });
        res.end();
    }).listen(80);

    createServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Server started on https://localhost:${port}. Mode: ${dev ? "dev" : "prod"}`);
    });
});
