// backend/server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'dev_only_change_me'; // for local learning only

app.use(cors());
app.use(express.json());

// ---------- In-memory "database" (resets on restart) ----------
const users = [];

// Seed one admin so you can test admin-only routes
const adminHash = bcrypt.hashSync('admin123', 10);
users.push({
  id: uuid(),
  name: 'Komorebi Admin',
  email: 'admin@komorebi.local',
  phone: '0000000000',
  password: adminHash,
  role: 'admin',       // roles: customer | staff | admin
  active: true,
});

// helper: never send password to client
const clean = (u) => {
  const { password, ...rest } = u;
  return rest;
};

// auth middleware (optionally restrict by role)
const auth = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = payload; // { id, role, name }
      if (roles.length && !roles.includes(payload.role)) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};

// ---------- Health ----------
app.get('/api', (req, res) => {
  res.json({ ok: true, message: 'API running' });
});

// ---------- Sprint 1 basic endpoints ----------
// Register (customer)
app.post('/api/auth/register', (req, res) => {
  const { name, email, phone = '', password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'name, email, password required' });
  if (users.some((u) => u.email === email))
    return res.status(400).json({ message: 'Email already in use' });

  const hash = bcrypt.hashSync(password, 10);
  const user = { id: uuid(), name, email, phone, password: hash, role: 'customer', active: true };
  users.push(user);
  return res.status(201).json({ message: 'Registered', user: clean(user) });
});

// Login (any active user)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.active);
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, {
    expiresIn: '1d',
  });
  res.json({ token, user: clean(user) });
});

// Who am I (check token)
app.get('/api/auth/me', auth(), (req, res) => {
  const me = users.find((u) => u.id === req.user.id);
  if (!me) return res.status(404).json({ message: 'User not found' });
  res.json({ user: clean(me) });
});

// Admin: create user (set role)
app.post('/api/admin/users', auth('admin'), (req, res) => {
  const { name, email, phone = '', password, role = 'customer' } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'name, email, password required' });
  if (users.some((u) => u.email === email))
    return res.status(400).json({ message: 'Email already in use' });

  const hash = bcrypt.hashSync(password, 10);
  const user = { id: uuid(), name, email, phone, password: hash, role, active: true };
  users.push(user);
  res.status(201).json({ message: 'User created', user: clean(user) });
});

// Admin: activate/deactivate user
app.patch('/api/admin/users/:id/active', auth('admin'), (req, res) => {
  const { id } = req.params;
  const { active } = req.body;
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.active = Boolean(active);
  res.json({ message: 'Updated', user: clean(user) });
});

// (Optional) Admin: list users (handy for testing)
app.get('/api/admin/users', auth('admin'), (req, res) => {
  res.json({ users: users.map(clean) });
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
