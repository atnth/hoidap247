fetch('/log-ip', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ip: ip_address }),
})
.then(response => response.json())
.then(data => {
    console.log('IP address logged:', data);
})
.catch(error => {
    console.error('Error logging IP address:', error);
});
