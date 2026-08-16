const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con SQLite:', err.message);
  } else {
    console.log('Base de datos SQLite conectada correctamente.');
  }
});

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL)", (err) => {
    if (err) {
      console.error("Error creando la tabla items:", err.message);
    } else {
      console.log("Tabla 'items' lista y verificada.");
    }
  });
});

module.exports = db;