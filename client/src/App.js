import { useState } from "react"
import Login from "./components/Login"
import Register from "./components/Register"
import Dashboard from "./components/Dashboard"

function App() {
  const [page, setPage] = useState("login")

  const token = localStorage.getItem("token")

  if (!token) {
    return page === "login" ? (
      <Login onLogin={() => window.location.reload()} onSwitch={() => setPage("register")} />
    ) : (
      <Register onSwitch={() => setPage("login")} />
    )
  }

  return <Dashboard />
}

export default App
