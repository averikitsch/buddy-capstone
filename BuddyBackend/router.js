import express, { Router } from 'express';
// Import index action from movies controller
import { index } from './controllers/users';

// Initialize the router
const router = Router();

// Handle /movies.json route with index action from movies controller
router.route('/users.json')
  .get(index);

export default router;
