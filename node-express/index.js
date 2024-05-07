const express = require("express");
const http = require("http");
const dishRouter = require('./routes/dishRouter')

const hostname = "localhost";
const port = 3000;

const app = express();

app.use('/dishes', dishRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server listening at http://${hostname}:${port}`);
});
