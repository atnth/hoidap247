const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to log IP addresses
app.use((req, _res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Visitor IP:', ip);
    next();
});

// Serve static files from the public directory
app.use(express.static("./public"));    

app.listen(port, () => {
    console.log(`Server is running at https://atnth.github.io/hoidap247/`);
});
