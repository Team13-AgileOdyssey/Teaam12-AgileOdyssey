const express = require('express');
const router = express.Router();

router
    .route("/homepage")
    .get(async (req, res) => {
        return res.render('homepage', { title: "Homepage", layout: 'main' });
    })

module.exports = router;