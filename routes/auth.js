const express = require('express');
const router = express.Router();
const path = require('path');
const firebase = require('../config/firebase');
const database = firebase.database();

router
    .route("/register")
    .get(async (req, res) => {
        if (req.session.user) {
            return res.redirect('/navigation/homepage');
        }
        else {
            return res.render('sign-up', { title: "Registration Page", layout: 'main-login-register' });
        }
    })
    .post(async (req, res) => {
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(req.body.email, req.body.password)
                .then((data) => {
                    const user = data.user;
                    let databaseRef = database.ref();
                    let userData = {
                        email: user.email
                    }
                    databaseRef.child('users/' + user.uid).set(userData);
                    return res.redirect('/');
                })
                .catch(function (error) {
                    console.log(error);
                    return res.json({ error: errorMessage });
                });
        }
        catch (e) {
            console.log('No good', e);
            res.redirect('/');
        }
    });


router
    .route("/")
    .get(async (req, res) => {
        if (req.session.user) {
            return res.redirect('/navigation/homepage');
        }
        else {
            return res.render('login', { title: "Log-in", layout: 'main-login-register' });
        }
    })
    .post(async (req, res) => {
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(req.body.email, req.body.password)
                .then((user) => {
                    req.session.user = { _id: user.user.uid };
                    return res.redirect('/navigation/homepage');
                })
                .catch(function (error) {
                    return res.json({ error: errorMessage });
                });

        }
        catch (e) {
            console.log('No good', e);
            res.redirect('/');
        }
    });

router
    .route('/logout')
    .get(async (req, res) => {
        req.session.destroy()
        return res.redirect('/');
    });


module.exports = router;