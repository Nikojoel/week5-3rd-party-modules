'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

const login = (req, res) => {
    // TODO: add passport authenticate
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, process.env.JWT_SECRET);
            return res.json({user, token});
        });
    })(req, res);
};
const user_create_post = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('user create error', errors);
        res.send(errors.array());
    } else {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const params = [
            req.body.name,
            req.body.username,
            hash
        ];
        if (await userModel.addUser(params)) {
            next();
        } else {
            res.status(400).json({error: 'register error'});
        }
    }
};

const logout = (req, res) => {
    req.logout();
    res.json({message: 'logout'});
};
module.exports = {
    login,
    user_create_post,
    logout,
};