const express = require("express");

const usersController = require("./controllers/usersController")

const app = express();
const expressSwagger = require('express-swagger-generator')(app);

app.get("/api/users", usersController.getAllUsers);
app.get("/api/users/:username/details", usersController.getUser);
app.get("/api/users/:username/repos", usersController.getRepos);

let options = {
    swaggerDefinition: {
        info: {
            description: 'Shaw and Partners assignment',
            title: 'Shawand Partners',
            version: '1.0.0',
        },
        produces: [
            "application/json"
        ],
        schemes: ['https', 'http']
    },
    basedir: __dirname, //app absolute path
    files: ['./controllers/*Controller.js'] //Path to the API handle folder
};
expressSwagger(options);

const server = app.listen(process.env.PORT || 5000, function () {
    console.log(`I can listen to you on port ${process.env.PORT || 5000}`);
});

module.exports = { app, server }