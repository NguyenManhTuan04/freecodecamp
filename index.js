const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Middleware to handle JSON responses
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Basic route to serve the index.html file
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Route to handle the timestamp microservice
app.get("/api/:date?", function (req, res) {
  const dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
  } else if (!isNaN(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
});
