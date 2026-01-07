import { useState } from "react"
import api from "../services/api"

function Login({ onLogin, onSwitch }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { username, password })
      localStorage.setItem("token", res.data.token)
      onLogin()
    } catch {
      setError("Invalid username or password")
    }
  }

  return (
    <div style={styles.container}>
      <h2>Login</h2>

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

      <button onClick={handleLogin}>Login</button>

      {error && <p style={styles.error}>{error}</p>}

      <p style={styles.link} onClick={onSwitch}>
        Create new account
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
  error: { color: "red" },
  link: { color: "#2563eb", cursor: "pointer" }
}

export default Login
