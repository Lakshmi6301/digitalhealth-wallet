import { useState } from "react"
import api from "../services/api"

function AddVital() {
  const [vitalType, setVitalType] = useState("")
  const [value, setValue] = useState("")
  const [date, setDate] = useState("")
  const [message, setMessage] = useState("")

  const addVital = async () => {
    if (!vitalType || !value || !date) {
      setMessage("All fields required")
      return
    }

    await api.post("/vitals", {
      vital_type: vitalType,
      value,
      recorded_date: date
    })

    setMessage("Vital added")
    setVitalType("")
    setValue("")
    setDate("")
  }

  return (
    <div style={styles.card}>
      <h3>Add Vital</h3>

      <select value={vitalType} onChange={e => setVitalType(e.target.value)}>
        <option value="">Select Vital</option>
        <option value="BP">BP</option>
        <option value="Sugar">Sugar</option>
        <option value="Heart Rate">Heart Rate</option>
      </select>

      <input
        placeholder="Value"
        value={value}
        onChange={e => setValue(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <button onClick={addVital}>Add</button>

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

export default AddVital
