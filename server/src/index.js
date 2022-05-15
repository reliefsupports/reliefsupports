const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/api');
const apiEntries = require('./routes/entries');
const apiUser = require('./routes/user');

const config = require('./config');
const port = '3001';

const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// connect to mongoose
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(config.mongoUrl, options);

const serve = async () => {
  mongo.then(
    () => {
      app.use(express.static(path.join(__dirname, 'public')));

      app.use('/api', apiRoutes);
      app.use('/api/entries', apiEntries);
      app.use('/api/user', apiUser);

      app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
      });

      app.listen(port, () => {
        console.log(`Listening on port ${port}`);
      });
    },
    (error) => {
      console.log(error, 'error');
    }
  );
};
serve();
