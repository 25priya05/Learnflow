const express = require("express");
const connectDb = require("./config/db");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const passport = require("passport");

const app = express();
const PORT = 3000;

connectDb();

require("./models/User");
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
        }),
    })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use("./auth", require("./routes/auth"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
