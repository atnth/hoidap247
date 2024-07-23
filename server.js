const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost/ip-tracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const ipSchema = new mongoose.Schema({
    ip: String,
    timestamp: { type: Date, default: Date.now }
});

const Ip = mongoose.model('Ip', ipSchema);

// Middleware để ghi IP của người dùng
app.use((req, res, next) => {
    const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.connection.remoteAddress;
    console.log('Visitor IP:', ip);
    
    // Lưu IP vào cơ sở dữ liệu
    const ipEntry = new Ip({ ip });
    ipEntry.save().then(() => console.log('IP saved to database'));

    next();
});

// Cung cấp các tệp tĩnh từ thư mục public
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
