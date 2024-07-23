const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Define port with a default value

// Middleware to log IP addresses
app.use((req, _res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.connection.remoteAddress;
    console.log('Visitor IP:', ip);
    next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));    

app.listen(port, () => {
    console.log(`Server is running at https://atnth.github.io/hoidap247/`);
});
