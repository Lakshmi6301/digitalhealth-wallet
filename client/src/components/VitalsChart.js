import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import api from "../services/api"

function VitalsChart() {
  const [vitals, setVitals] = useState([])
  const [vitalType, setVitalType] = useState("BP")

  useEffect(() => {
    fetchVitals()
  }, [])

  const fetchVitals = async () => {
    const res = await api.get("/vitals")
    setVitals(res.data)
  }

  const filteredVitals = vitals.filter(v => v.vital_type === vitalType)

  return (
    <div style={styles.card}>
      <h3>Vitals Trend</h3>

      <select value={vitalType} onChange={e => setVitalType(e.target.value)}>
        <option value="BP">BP</option>
        <option value="Sugar">Sugar</option>
        <option value="Heart Rate">Heart Rate</option>
      </select>

      <LineChart width={500} height={300} data={filteredVitals}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="recorded_date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" />
      </LineChart>
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

export default VitalsChart
