const express = require('express');
const routes = require('./routes');
require('dotenv').config();

const app = express();

// Parse body to json
app.use(express.json());

app.use('', routes);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started running on port ${process.env.PORT || 3000}`);
});

module.exports = { app, server };
