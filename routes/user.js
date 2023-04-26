const express = require('express');
const router = express.Router();
const firebase = require('../config/firebase');
const database = firebase.database();
router
    .route("/user/homepage")
    .get(async (req, res) => {
        return res.render('homepage-user', { title: "User Team", layout: 'main' });
    })

module.exports = router;