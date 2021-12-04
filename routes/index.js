const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function (req, res, next) {
    const error = req.flash().error || '';
    res.render('index', { user: req.user, error: error });
});

router.get('/register', (req, res, next) => {
    res.render('register');
});

router.post('/register', (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {

        if (err) return next(err);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        })

        newUser.save((err) => {
            if (err) return next(err);
            res.redirect('/');
        })

    })

});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    })
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

module.exports = router;
