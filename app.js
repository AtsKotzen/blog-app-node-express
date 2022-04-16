const express = require('express');
const {engine} = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const adminRoutes = require('./routes/admin');
const path = require('path');

// Configure the app
    // Handlebars
    app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));    app.set('view engine', 'handlebars');
    app.set('view engine', 'handlebars');
    app.set("views", "./views");
    // Body Parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Mongoose
      mongoose.Promise = global.Promise;
      mongoose.connect('mongodb://localhost/blogapp').then(() => {
        console.log('Connected to mongodb');
      }).catch((err) => {
        console.log('Error connecting to mongodb: ' + err);
      });

    // Public
    app.use(express.static(path.join(__dirname, 'public')));    // Routes
    app.use('/admin', adminRoutes);

// Others
const PORT = 8081
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})