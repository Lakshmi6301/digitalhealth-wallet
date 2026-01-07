const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("health_wallet.db")

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT,
    type TEXT,
    date TEXT,
    vitals TEXT,
    user_id INTEGER
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS vitals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    vital_type TEXT,
    value TEXT,
    recorded_date TEXT
  )`)

  db.run(`CREATE TABLE IF NOT EXISTS shares (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    report_id INTEGER,
    shared_with TEXT,
    access_type TEXT
  )`)
})

module.exports = db
