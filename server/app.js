const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

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

// app.get('/admin/dashboard', verifyAdminToken, (req, res) => {
//   res.send('Welcome to the Admin Dashboard');
// });
// Fetch Champions League data from football-data.org
app.get('/api/football', async (req, res) => {
  try {
      const apiKey = process.env.FOOTBALL_DATA_API_KEY;

      const matchesResponse = await fetch('https://api.football-data.org/v2/competitions/CL/matches', {
          headers: {
              'X-Auth-Token': apiKey
          }
      });
      if (!matchesResponse.ok) {
          throw new Error(`HTTP error! status: ${matchesResponse.status}`);
      }
      const matchesData = await matchesResponse.json();

      const standingsResponse = await fetch('https://api.football-data.org/v2/competitions/CL/standings', {
          headers: {
              'X-Auth-Token': apiKey
          }
      });
      if (!standingsResponse.ok) {
          throw new Error(`HTTP error! status: ${standingsResponse.status}`);
      }
      const standingsData = await standingsResponse.json();

      const scorersResponse = await fetch('https://api.football-data.org/v2/competitions/CL/scorers', {
          headers: {
              'X-Auth-Token': apiKey
          }
      });
      // if (!scorersResponse.ok) {
      //     throw new Error(`HTTP error! status: ${scorersResponse.status}`);
      // }
      const scorersData = await scorersResponse.json();

      const responseData = {
          matches: matchesData.matches,
          standings: standingsData.standings,
          scorers: scorersData.scorers
      };

      console.log('API Response:', responseData);
      // res.json(responseData);
  } catch (error) {
      console.error('Error fetching football data:', error);
      // res.status(500).json({ error: 'Failed to fetch data' });
  }
});



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