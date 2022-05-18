const express = require('express');
const router = express.Router();
const short = require('short-uuid');
const { db } = require('../models/couple');
const resResult = require('./common/resResult')
const shortid = require('shortid');

router.get('/storylist', (req, res) => {
    res.render('story/storyList')
})



module.exports = router;