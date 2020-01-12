const express = require("express");


const app = express();

app.get("/", function (req, resp) {
    return resp.status(200).send("It works!");

}).listen(process.env.PORT, function () {
    console.log(`I can listen to you on port ${process.env.PORT}`);
});