import * as tutorials from '../controllers/tutorial.controller';
import express, { Router } from 'express';
const router = express.Router();

export default (app: Router): void => {
  // Create a new Tutorial
  router.post('/', tutorials.create);

  // Retrieve all Tutorials
  router.get('/', tutorials.findAll);

  // Retrieve all published Tutorials
  router.get('/published', tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get('/:id', tutorials.findOne);

  // Update a Tutorial with id
  router.put('/:id', tutorials.update);

  // Delete a Tutorial with id
  router.delete('/:id', tutorials.deletee);

  // Delete all Tutorials
  router.delete('/', tutorials.deleteAll);

  app.use('/api/tutorials', router);
};
