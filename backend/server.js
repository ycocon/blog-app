require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blog");

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/blogs", blogRoutes);

// connect to db and listen to request
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening to port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
