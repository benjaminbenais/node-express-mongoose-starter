const express = require('express');
const Todo = require('../../models/todo');

const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const data = await Todo.find().lean();
    res.json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    res.json({ message: 'Todo sucessfully created', todo });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
