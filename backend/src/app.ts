import express, { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import multer from 'multer';
import cors from 'cors';

const app = express();
app.use(express.json()); // For parsing JSON request bodies
app.use(cors());

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);
const upload = multer({ dest: 'uploads/' }); // or configure as needed

// --- Mock Database (for demonstration only) ---
const users = [
  { id: '1', username: 'user1', password: 'pass123' }, // NEVER store plaintext passwords in production
];
const resumes: any[] = [];

// --- API Routes ---

// Login Handler
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Validate user credentials (simplified)
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Normally you would create and return a JWT or session token here
  res.json({ message: 'Login successful', userId: user.id });
});

// Google Authentication Handler
app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload?.email;

    // TODO: Lookup or create user in your DB using email
    // For demo, just return the email and a fake token
    res.json({ user: email, token: 'example-jwt-or-session' });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ error: 'Invalid Google token' });
  }
});

// Save Resume Handler
app.post('/api/resumes', upload.single('file'), (req: Request, res: Response) => {
  const { title } = req.body;
  const file = req.file;

  // TODO: Save to your database: title, file.path or file.filename as file_url, etc.
  const resume = {
    id: (resumes.length + 1).toString(),
    user_id: 'user-id', // Replace with real user ID if available
    title,
    file_url: file ? `/uploads/${file.filename}` : null,
    status: 'active',
    uploaded_at: new Date(),
  };
  resumes.push(resume);
  res.status(201).json(resume);
});

// Get User Resumes Handler
app.get('/api/resumes/:userId', (req, res) => {
  const { userId } = req.params;

  const userResumes = resumes.filter(r => r.userId === userId);
  res.json(userResumes);
});

export default app;