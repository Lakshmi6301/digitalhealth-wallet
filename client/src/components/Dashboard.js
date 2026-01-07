import UploadReport from "./UploadReport"
import ReportsList from "./ReportsList"
import AddVital from "./AddVital"
import VitalsChart from "./VitalsChart"
import ShareAccess from "./ShareAccess"

function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>Digital Health Wallet</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <UploadReport />
      <ReportsList />
      <AddVital />
      <VitalsChart />
      <ShareAccess />
    </div>
  )
}

const styles = {
  page: {
    padding: "20px",
    background: "#f8fafc",
    minHeight: "100vh"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  }
}

export default Dashboard
