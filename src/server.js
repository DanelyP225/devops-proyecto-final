const express = require('express');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de Monitoreo
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

app.get('/api/items', (req, res) => {
  db.all("SELECT * FROM items ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

app.post('/api/items', (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }

  const query = "INSERT INTO items (name) VALUES (?)";
  db.run(query, [name.trim()], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, name: name.trim() });
  });
});

app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'El nombre es requerido para actualizar' });
  }

  const query = "UPDATE items SET name = ? WHERE id = ?";
  db.run(query, [name.trim(), id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Item no encontrado' });
    res.json({ id: Number(id), name: name.trim() });
  });
});

app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM items WHERE id = ?";

  db.run(query, [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Item no encontrado' });
    res.json({ message: 'Item eliminado correctamente', id: Number(id) });
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  });
}

module.exports = app;