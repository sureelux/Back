require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error");
const authRoute = require("./routes/auth-route");
const adminRoute = require("./routes//admin-router");
const userRoute = require("./routes//user-router");
const authenticate = require("./middlewares/authenticate");
const web = express();

web.use(cors());
web.use(express.json());

//service
web.use("/auth",authRoute);
web.use("/admin",authenticate ,adminRoute);
web.use("/user",authenticate ,userRoute);

// notFond
web.use(notFound);

// error
web.use(errorMiddleware);

let port = process.env.PORT || 8000;
web.listen(port, () => console.log("Server on Port : ", port));