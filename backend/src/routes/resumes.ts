import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  // Save new resume logic here
  res.json({ message: 'Resume saved' });
});

router.get('/:userId', (req, res) => {
  // Fetch resumes for a user logic here
  res.json({ resumes: [] });
});

export default router;