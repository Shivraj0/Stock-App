const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./src/config/config.js');

// Creates express app.
const app = express();

// Parse application json.
app.use(bodyparser.json());

// Database connection
mongoose.Promise = global.Promise;
mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Database is connected.!');
}).catch((err) => {
    console.log('Error connecting to database...');
    process.exit();
})

app.get('/', (req, res) => {
    res.status(200).send('CRUD Application.');
});

require('./src/routes/routes')(app);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})
