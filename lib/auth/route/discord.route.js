'use strict';

const express = require('express');
const router = express.Router();
const oauth = require('../middleware/discord.js');

router.get('/oauth', oauth, (req, res) => {
    console.log(req.user);
    console.log(req.token);
    res.status(200).send(req.token);
  });

  module.exports = router;