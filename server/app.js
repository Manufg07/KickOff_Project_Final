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
const storyRoutes = require('./routes/stories');

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
app.use('/st', storyRoutes);

const cache = {};

app.get('/api/football', async (req, res) => {
  try {
    const apiKey = process.env.FOOTBALL_DATA_API_KEY;
    const league = req.query.league || 'CL'; // Default to Champions League if no league is specified

    const leagueIds = {
      champions_league: 'CL',
      premier_league: 'PL',
      la_liga: 'PD',
      serie_a: 'SA',
      bundesliga: 'BL1',
      ligue_1: 'FL1',
      indian_super_league: 'ISL',
      eredivisie: 'DED'
    };

    const leagueId = leagueIds[league.toLowerCase()] || 'CL'; // Default to CL if league is not found

    const cacheKey = `footballData_${leagueId}`;
    const cachedData = cache[cacheKey];
    
    if (cachedData) {
      console.log('Returning cached data');
      return res.json(cachedData);
    }

    const fetchFromAPI = async (url) => {
      const response = await fetch(url, {
        headers: {
          'X-Auth-Token': apiKey,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} | URL: ${url}`);
      }
      return response.json();
    };

    const matchesData = await fetchFromAPI(`https://api.football-data.org/v2/competitions/${leagueId}/matches`);
    const standingsData = await fetchFromAPI(`https://api.football-data.org/v2/competitions/${leagueId}/standings`);
    const scorersData = await fetchFromAPI(`https://api.football-data.org/v2/competitions/${leagueId}/scorers`);

    const responseData = {
      matches: matchesData.matches,
      standings: standingsData.standings,
      scorers: scorersData.scorers,
    };

    // Cache the response for 10 minutes (600000 milliseconds)
    cache[cacheKey] = responseData;
    setTimeout(() => {
      delete cache[cacheKey];
    }, 600000);

    console.log('API Response:', responseData);
    res.json(responseData); // Make sure to send the response
  } catch (error) {
    console.error('Error fetching football data:', error);
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
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