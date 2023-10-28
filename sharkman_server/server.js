const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://karloslazaroo:101400karlo@cluster0.eeo2sln.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', ()=> {
    console.log('Connected to MongoDB');
});


app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});