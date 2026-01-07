const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const db = require("./database")
const auth = require("./auth")

const app = express()
app.use(cors())
app.use(express.json())

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  }
})

const upload = multer({ storage })

app.post("/register", async (req, res) => {
  const { username, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    err => {
      if (err) {
        return res.status(400).json({ message: "User already exists" })
      }
      res.json({ message: "User registered" })
    }
  )
})

app.post("/login", (req, res) => {
  const { username, password } = req.body

  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" })
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return res.status(400).json({ message: "Invalid credentials" })
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        "health_secret"
      )

      res.json({ token })
    }
  )
})

app.post("/reports", auth, upload.single("file"), (req, res) => {
  const { type, date, vitals } = req.body

  db.run(
    "INSERT INTO reports (filename, type, date, vitals, user_id) VALUES (?, ?, ?, ?, ?)",
    [req.file.filename, type, date, vitals, req.user.id],
    () => {
      res.json({ message: "Report uploaded" })
    }
  )
})

app.get("/reports", auth, (req, res) => {
  db.all(
    "SELECT * FROM reports WHERE user_id = ?",
    [req.user.id],
    (err, rows) => {
      res.json(rows)
    }
  )
})

app.post("/vitals", auth, (req, res) => {
  const { vital_type, value, recorded_date } = req.body

  db.run(
    "INSERT INTO vitals (user_id, vital_type, value, recorded_date) VALUES (?, ?, ?, ?)",
    [req.user.id, vital_type, value, recorded_date],
    () => {
      res.json({ message: "Vital added" })
    }
  )
})

app.get("/vitals", auth, (req, res) => {
  db.all(
    "SELECT * FROM vitals WHERE user_id = ?",
    [req.user.id],
    (err, rows) => {
      res.json(rows)
    }
  )
})

app.post("/share", auth, (req, res) => {
  const { report_id, shared_with } = req.body

  db.run(
    "INSERT INTO shares (report_id, shared_with, access_type) VALUES (?, ?, ?)",
    [report_id, shared_with, "read"],
    () => {
      res.json({ message: "Report shared" })
    }
  )
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

