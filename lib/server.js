'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
// const timestamp = require('../middleware/timestamp.js')
// const logger = require('../middleware/logger.js');
// const notFound = require('../middleware/404.js');
// const serverError = require('../middleware/500.js');
const user = require('../lib/auth/route/authorize.js');
const oauthRoute = require('../lib/auth/route/discord.route.js');
app.use(cors());
app.use(express.static('./public'));

app.use(express.json());
// app.use(timestamp);
// app.use(logger);

app.use(user);
app.use(oauthRoute);


// app.use('*', notFound);
// app.use(serverError);


module.exports = {
    server: app,
    start: function(port){
        const PORT = port || process.env.PORT || 3000
        app.listen(PORT, () => console.log(`listening on port ${PORT}`))
    }
}