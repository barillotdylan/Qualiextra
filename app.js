
// app.js
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { authenticate } from './middlewares/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/private', authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user.prenom}` });
});

const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

