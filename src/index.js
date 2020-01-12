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
            description: 'Shawand Partners assignment',
            title: 'Shawand Partners',
            version: '1.0.0',
        },
        produces: [
            "application/json"
        ],
        schemes: ['http', 'https']
    },
    basedir: __dirname, //app absolute path
    files: ['./controllers/*Controller.js'] //Path to the API handle folder
};
expressSwagger(options);

app.listen(process.env.PORT, function () {
    console.log(`I can listen to you on port ${process.env.PORT}`);
});