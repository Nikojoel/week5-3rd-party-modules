'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('./utils/pass');

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

app.use(express.static('uploads'));
app.use(express.static('week2_public_html'));
app.use('/thumbnails',express.static('thumbnails'));

const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

app.use('/cat',passport.authenticate('jwt', {session: false}), catRoute);
app.use('/user',passport.authenticate('jwt', {session: false}), userRoute);
app.use('/auth', authRoute);
app.listen(3000);
/*
console.log(process.env.SERVER);
if(process.env.SERVER === 'dev_localhost') {
    console.log('localhost');
    require('./secure/localhost')(app);
} else {
    require('./secure/server')(app);
    app.listen(3000, () => {
        console.log('server app start?');
    });
}
 */

