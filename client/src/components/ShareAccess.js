import { useEffect, useState } from "react"
import api from "../services/api"

function ShareAccess() {
  const [reports, setReports] = useState([])
  const [selectedReport, setSelectedReport] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    const res = await api.get("/reports")
    setReports(res.data)
  }

  const shareReport = async () => {
    if (!selectedReport || !email) {
      setMessage("Select report and enter email")
      return
    }

    await api.post("/share", {
      report_id: selectedReport,
      shared_with: email
    })

    setMessage("Report shared successfully")
    setEmail("")
    setSelectedReport("")
  }

  return (
    <div style={styles.card}>
      <h3>Share Report Access</h3>

      <select
        value={selectedReport}
        onChange={e => setSelectedReport(e.target.value)}
      >
        <option value="">Select Report</option>
        {reports.map(r => (
          <option key={r.id} value={r.id}>
            {r.type} - {r.date}
          </option>
        ))}
      </select>

      <input
        placeholder="Doctor / Family Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={shareReport}>Share</button>

      {message && <p>{message}</p>}
    </div>
  )
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px"
  }
}

export default ShareAccess
