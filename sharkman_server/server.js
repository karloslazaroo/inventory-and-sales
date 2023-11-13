const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://karloslazaroo:101400karlo@cluster0.eeo2sln.mongodb.net/Sharkman', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', ()=> {
    console.log('Connected to MongoDB');
});


const inventoryRouter = require('./routes/product')
app.use('/product', inventoryRouter)

// const salesRouter = require('./routes/sales')
// app.use('/sales', salesRouter)

app.listen(4000, () => {
    console.log('Server is running');
});