import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import api from "../services/api";
import styles from "../styles/styles";

const STATUS_COLORS = ["#4ade80", "#60a5fa", "#f59e0b", "#f87171", "#a78bfa"];
const STATUS_LABELS = ["Confirmed", "Pending", "Completed", "Cancelled", "In Progress"];

function Dashboard() {
  const { loggedUser } = useContext(PatientContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    api.get("/users").then((res) => {
      setAppointments(res.data);
      setLoading(false);
    });
  }, []);

  const stats = [
    { label: "Total",     value: appointments.length, color: "#60a5fa" },
    { label: "Confirmed", value: 4,                   color: "#4ade80" },
    { label: "Pending",   value: 3,                   color: "#f59e0b" },
    { label: "Completed", value: 3,                   color: "#a78bfa" },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>Appointment Dashboard</h2>
          <p style={styles.pageSubtitle}>
            Logged in as <strong>{loggedUser?.name}</strong> &bull;{" "}
            {appointments.length} appointments
          </p>
        </div>
        <div style={styles.statsRow}>
          {stats.map((s) => (
            <div key={s.label} style={{ ...styles.statCard, borderColor: s.color }}>
              <span style={{ ...styles.statValue, color: s.color }}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <p style={styles.loader}>Loading appointments...</p>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {["#", "Patient Name", "Email", "Phone", "Status", "Action"].map((h) => (
                  <th key={h} style={styles.tableHead}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointments.map((p, i) => (
                <tr key={p.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>
                    <span style={styles.idBadge}>{p.id}</span>
                  </td>
                  <td style={styles.tableCell}>
                    <div style={styles.patientCell}>
                      <div style={{ ...styles.avatarSm, background: STATUS_COLORS[i % 5] }}>
                        {p.name[0]}
                      </div>
                      <span style={styles.patientName}>{p.name}</span>
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <span style={styles.emailText}>{p.email}</span>
                  </td>
                  <td style={styles.tableCell}>{p.phone}</td>
                  <td style={styles.tableCell}>
                    <span style={{
                      ...styles.statusBadge,
                      background: STATUS_COLORS[i % 5] + "22",
                      color: STATUS_COLORS[i % 5],
                    }}>
                      {STATUS_LABELS[i % 5]}
                    </span>
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.viewBtn}
                      onClick={() => navigate(`/patient-details/${p.id}`)}
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;