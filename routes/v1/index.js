const v1 = require('express').Router();
const todo = require('./todo');

v1.use('/todo', todo);

module.exports = v1;
