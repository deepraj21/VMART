const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const mongoDB = require("./db");
mongoDB();

// Define allowed origins
const allowedOrigins = [
    'http://localhost:3000',
    'https://vmart-v1.vercel.app/'
];

// Use CORS middleware with dynamic origin
app.use(cors({
    origin: function (origin, callback) {
        // Check if the origin is in the allowedOrigins array or is undefined (for non-browser requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(express.json());
app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


