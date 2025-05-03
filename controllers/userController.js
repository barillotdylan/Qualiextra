import User from "../models/user.js";

export const getMe = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json(user);
};

export const updateMe = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  await user.update(req.body);
  res.json(user);
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  }
  catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
  res.json(users);
};

export const getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
  res.json(user);
};

export const updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.update(req.body);
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  await user.destroy();
  res.json({ message: 'Utilisateur supprimé' });
};
