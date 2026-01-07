import { useState } from "react"
import api from "../services/api"

function Register({ onSwitch }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleRegister = async () => {
    try {
      await api.post("/register", { username, password })
      setMessage("Registration successful. Please login.")
    } catch {
      setMessage("User already exists")
    }
  }

  return (
    <div style={styles.container}>
      <h2>Register</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      {message && <p>{message}</p>}

      <p style={styles.link} onClick={onSwitch}>
        Back to login
      </p>
    </div>
  )
}

const styles = {
  container: {
    width: "300px",
    margin: "120px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  link: { color: "#2563eb", cursor: "pointer" }
}

export default Register
