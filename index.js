const express = require('express');
const app = express();

// Middleware to handle JSON responses
app.use(express.json());

// Route to handle the date API
app.get('/api/:date?', (req, res) => {
    const dateString = req.params.date;
    console.log(`Received date: ${dateString}`);

    let date;
    if (!dateString) {
        date = new Date();
    } else {
        if (!isNaN(dateString)) {
            // If dateString is a number, treat it as a Unix timestamp
            date = new Date(parseInt(dateString));
        } else {
            // If dateString is not a number, treat it as a date string
            date = new Date(dateString);
        }
    }

    if (isNaN(date.getTime())) {
        return res.json({ error: "Invalid Date" });
    }

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
