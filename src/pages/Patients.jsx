import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "../styles/styles";

function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");

  useEffect(() => {
    api.get("/users").then((res) => {
      setPatients(res.data);
      setLoading(false);
    });
  }, []);

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>Patient Registry</h2>
          <p style={styles.pageSubtitle}>{filtered.length} patients found</p>
        </div>
        <input
          style={styles.searchInput}
          placeholder="🔍  Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p style={styles.loader}>Loading patients...</p>
      ) : (
        <div style={styles.cardGrid}>
          {filtered.map((p) => (
            <div key={p.id} style={styles.patientCard}>
              <div style={{ ...styles.avatarMd, background: `hsl(${p.id * 36}, 70%, 50%)` }}>
                {p.name[0]}
              </div>
              <div style={styles.cardInfo}>
                <h3 style={styles.cardName}>{p.name}</h3>
                <p style={styles.cardEmail}>{p.email}</p>
                <p style={styles.cardPhone}>{p.phone}</p>
              </div>
              <button
                style={styles.cardViewBtn}
                onClick={() => navigate(`/patient-details/${p.id}`)}
              >
                View →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Patients;