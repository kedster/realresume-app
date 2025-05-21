import { Router } from 'express';

const router = Router();

const resumes: any[] = [];

router.post('/', (req, res) => {
  const { user_id, title, file_url, status } = req.body;
  if (!user_id || !title) {
    return res.status(400).json({ error: 'Missing user_id or title' });
  }
  const resume = {
    id: (resumes.length + 1).toString(),
    user_id,
    title,
    file_url: file_url || null,
    status: status || 'active',
    uploaded_at: new Date(),
  };
  resumes.push(resume);
  res.status(201).json(resume);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const userResumes = resumes.filter(r => r.user_id === userId);
  res.json({ resumes: userResumes });
});

export default router;