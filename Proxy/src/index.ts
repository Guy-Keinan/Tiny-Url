import express from "express";
import httpProxy from "http-proxy";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 4000; 
const BACKEND_SERVER = "http://localhost:3000";

const proxy = httpProxy.createProxyServer();

app.use((req, res, next) => {
    console.log(`Proxy received request: ${req.method} ${req.url}`);
    next();
});

app.use((req, res) => {
    proxy.web(req, res, { target: BACKEND_SERVER }, (err) => {
        console.error("Proxy error:", err);
        res.status(500).send("Something went wrong with the proxy.");
    });
});

app.listen(PORT, () => {
    console.log(`Proxy Server running on http://localhost:${PORT}`);
});
