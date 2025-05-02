import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models/index.js';
import sendEmail from '../utils/sendEmail.js';
import isTemporaryEmail from '../utils/tempEmailBlocker.js';
import { v4 as uuidv4 } from 'uuid';

const { User } = db;

export const register = async (req, res) => {
  const { prenom, nom, email, password } = req.body;

  if (isTemporaryEmail(email)) {
    return res.status(400).json({ error: 'Adresse email temporaire interdite' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const emailToken = uuidv4();

  try {
    const user = await User.create({
      prenom,
      nom,
      email,
      password: hashedPassword,
      emailToken,
    });

    await sendEmail(email, emailToken);
    res.status(201).json({ message: 'Utilisateur créé. Vérifiez votre email.' });
  } catch (e) {
    res.status(400).json({ error: 'Email déjà utilisé' });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({ where: { emailToken: token } });
  if (!user) return res.status(400).json({ error: 'Token invalide' });

  user.isVerified = true;
  user.emailToken = null;
  await user.save();

  res.json({ message: 'Email vérifié' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: 'Identifiants invalides' });

  if (!user.isVerified) return res.status(403).json({ error: 'Email non vérifié' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Identifiants invalides' });

  const token = jwt.sign({ id: user.id, role: user.role, prenom: user.prenom }, process.env.JWT_SECRET);
  res.json({ token });
};