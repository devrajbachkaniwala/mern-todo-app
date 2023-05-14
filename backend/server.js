const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const app = express();
const PORT = 3000;
const databaseName = 'todo';
const mongoUrl = `mongodb://localhost:27017/${databaseName}`;
const mongoClient = new MongoClient(mongoUrl);

(async () => {
  try {
    await mongoClient.connect();
  } catch (err) {
    console.error('Failed to connect to the mongodb');
  }

  console.log('Successfully connected to the database');

  const db = mongoClient.db(databaseName);
  const todosCollection = db.collection('todos');

  app.use(cors());

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(express.static(path.resolve(__dirname, 'public')));

  // get todos
  app.get('/todos', async (req, res) => {
    try {
      const todos = await todosCollection.find().toArray();
      res.status(200).json(todos);
    } catch (err) {
      console.log(err);
      const message = {
        errorCode: 'Get todos error',
        message: 'Failed to get todos'
      };
      res.status(400).json(message);
    }
  });

  // get todo
  app.get('/todos/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const todo = await todosCollection.findOne({ _id: new ObjectId(id) });
      res.status(200).json(todo);
    } catch (err) {
      console.log(err);
      const message = {
        errorCode: 'Get todo error',
        message: 'Failed to get todo'
      };
      res.status(400).json(message);
    }
  });

  // add todo
  app.post('/todos', async (req, res) => {
    try {
      const newTodo = {
        title: req.body.title,
        description: req.body.description,
        isCompleted: req.body.isCompleted
      };
      const result = await todosCollection.insertOne(newTodo);

      res.status(201).json({ insertedId: result.insertedId });
    } catch (err) {
      console.log(err);
      const message = {
        errorCode: 'Add todo error',
        message: 'Failed to add todo'
      };
      res.status(400).json(message);
    }
  });

  // update todo
  app.put('/todos/:id', async (req, res) => {
    try {
      const updatedTodo = {};

      if (req.body.title) {
        updatedTodo.title = req.body.title;
      }

      if (req.body.description) {
        updatedTodo.description = req.body.description;
      }

      if (typeof req.body.isCompleted === 'boolean') {
        updatedTodo.isCompleted = req.body.isCompleted;
      }

      const query = {
        _id: new ObjectId(req.params.id)
      };
      const result = await todosCollection.updateOne(query, {
        $set: updatedTodo
      });

      res.sendStatus(204);
    } catch (err) {
      console.log(err);
      const message = {
        errorCode: 'Update todo error',
        message: 'Failed to update todo'
      };
      res.status(400).json(message);
    }
  });

  // delete todo
  app.delete('/todos/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const todo = await todosCollection.deleteOne({ _id: new ObjectId(id) });
      res.sendStatus(204);
    } catch (err) {
      console.log(err);
      const message = {
        errorCode: 'Delete todo error',
        message: 'Failed to delete todo'
      };
      res.status(400).json(message);
    }
  });

  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
  );
})().catch((err) => {
  console.error(err);
  mongoClient.close();
});
