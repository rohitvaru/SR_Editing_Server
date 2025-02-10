const express = require('express');
const cors = require('cors');

const app = express();

app.use('/static',express.static('public'));

app.use(cors({
  origin: 'http://localhost:3001',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
    res.sendFile('./public/images/');  // This will not work
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});