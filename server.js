const http = require("http");
const app = require("./app");
const port = process.env.PORT || 6005;
const server = http.createServer(app);
server.timeout = 3000;
server.on("listening", function() {
  console.log("ok, server is running on port 6005");
});
server.listen(port);
