const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
// const routes = require("./routes/");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth")
const adminRoute = require("./routes/Admin")

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