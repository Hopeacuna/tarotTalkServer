require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");


app.use(require("./middleware/headers"));

const controllers = require("./controllers");

app.use(Express.json());

app.use("/user", controllers.userController);
app.use("/card", controllers.cardController);
app.use("/reflection", controllers.reflectionController);

app.use(require("./middleware/validateSession"))

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(3000, () => {
        console.log(`[Server]: App is listening on 3000.`);
    })
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
});
