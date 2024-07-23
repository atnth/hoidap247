// Giả sử bạn đang xử lý dữ liệu từ phía máy chủ
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Định nghĩa endpoint để nhận IP
app.post('/log-ip', (req, res) => {
    // Lấy địa chỉ IP từ request body
    const { ip } = req.body;

    if (ip) {
        console.log('IP address received:', ip);
        res.json({ message: 'IP address logged successfully' });
    } else {
        res.status(400).json({ message: 'IP address not provided' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
