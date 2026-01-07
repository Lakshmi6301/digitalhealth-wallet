import { useState } from "react"
import api from "../services/api"

function UploadReport() {
  const [file, setFile] = useState(null)
  const [type, setType] = useState("")
  const [date, setDate] = useState("")
  const [vitals, setVitals] = useState("")
  const [message, setMessage] = useState("")

  const upload = async () => {
    if (!file || !type || !date || !vitals) {
      setMessage("All fields are required")
      return
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)
    formData.append("date", date)
    formData.append("vitals", vitals)

    try {
      await api.post("/reports", formData)
      setMessage("Report uploaded successfully")
      setFile(null)
    } catch {
      setMessage("Upload failed")
    }
  }

  return (
    <div style={styles.card}>
      <h3>Upload Medical Report</h3>

      <input type="file" onChange={e => setFile(e.target.files[0])} />

      <input
        placeholder="Report Type (Blood Test, X-Ray...)"
        value={type}
        onChange={e => setType(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <input
        placeholder="Associated Vital (BP, Sugar...)"
        value={vitals}
        onChange={e => setVitals(e.target.value)}
      />

      <button onClick={upload}>Upload</button>

      {message && <p>{message}</p>}
    </div>
  )
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "6px"
  }
}

export default UploadReport
