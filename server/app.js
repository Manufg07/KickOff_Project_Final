const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');

// const routes = require("./routes/");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth")
const adminRoute = require("./routes/Admin")
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder for uploaded images/videos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static('uploads'));

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({ 
    origin: "http://localhost:3000",
  })
);


// app.use("/", );
app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use('/user', userRoutes);
app.use('/pt', postRoutes);


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
mongoose.connect(process.env.MONGO_URL);

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});