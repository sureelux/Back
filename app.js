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
const db = require("./models/db");

web.use(cors());
web.use(express.json());

web.use("/auth",authRoute);
web.use("/get", async (req, res, next) => {
    try {

      const tables = await db.table.findMany({
        include: {
          type_table: true,
        },
      });
      res.json({ tables });
    } catch (err) {
      next(err);
    }
  });

web.use("/getType*", async (req, res, next) => {
  try {
    const { type } = req.query; 
    const dTpye = await db.table.findMany({
      where: {
        type_table: {
          type_name: type
        }
      },
      include: {
        type_table: true
      }
    });
    res.json({ dTpye, type });
  } catch (err) {
    next(err);
  }
});

web.get('/admin/availableDates', (req, res) => {
});

web.use("/admin",authenticate ,adminRoute);
web.use("/user" ,userRoute);

web.use(notFound);
web.use(errorMiddleware);

let port = process.env.PORT || 8000;
web.listen(port, () => console.log("Server on Port : ", port));