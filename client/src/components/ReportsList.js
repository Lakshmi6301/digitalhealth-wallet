import { useEffect, useState } from "react"
import api from "../services/api"

function ReportsList() {
  const [reports, setReports] = useState([])
  const [filterDate, setFilterDate] = useState("")
  const [filterVital, setFilterVital] = useState("")

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    const res = await api.get("/reports")
    setReports(res.data)
  }

  const filteredReports = reports.filter(report => {
    const dateMatch = filterDate ? report.date === filterDate : true
    const vitalMatch = filterVital
      ? report.vitals.toLowerCase().includes(filterVital.toLowerCase())
      : true
    return dateMatch && vitalMatch
  })

  return (
    <div style={styles.card}>
      <h3>My Reports</h3>

      <div style={styles.filters}>
        <input
          type="date"
          value={filterDate}
          onChange={e => setFilterDate(e.target.value)}
        />
        <input
          placeholder="Filter by vital (BP, Sugar)"
          value={filterVital}
          onChange={e => setFilterVital(e.target.value)}
        />
      </div>

      {filteredReports.length === 0 && <p>No reports found</p>}

      {filteredReports.map(report => (
        <div key={report.id} style={styles.item}>
          <p><b>Type:</b> {report.type}</p>
          <p><b>Date:</b> {report.date}</p>
          <p><b>Vital:</b> {report.vitals}</p>
        </div>
      ))}
    </div>
  )
}

const styles = {
  card: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "6px",
    marginBottom: "20px"
  },
  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px"
  },
  item: {
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "8px",
    marginBottom: "8px"
  }
}

export default ReportsList
