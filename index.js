const express = require('express');
const app = express();

// Middleware to handle JSON responses
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Timestamp API is running");
});

// Route to handle the date API
app.get('/api/:date?', (req, res) => {
    const dateString = req.params.date;
    console.log(`Received date: ${dateString}`);

    let date;
    if (!dateString) {
        date = new Date();
    } else {
        if (!isNaN(dateString)) {
            date = new Date(parseInt(dateString));
        } else {
            date = new Date(dateString);
        }
    }

    if (date.toString() === "Invalid Date") {
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
