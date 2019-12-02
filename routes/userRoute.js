'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/', userController.user_list_get);

router.get('/:id', userController.user_get);

router.post('/', authController.user_create_post);

router.put('/', (req, res) => {
  res.send('With this endpoint you can modify users.');
});

router.delete('/', (req, res) => {
  res.send('With this endpoint you can delete users.');
});

module.exports = router;
