import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import styles from "../styles/styles";

function PatientDetails() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/users/${id}`).then((res) => {
      setPatient(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p style={styles.loader}>Loading patient details...</p>;

  const fields = [
    { icon: "✉",  label: "Email",       value: patient.email },
    { icon: "📞", label: "Phone",       value: patient.phone },
    { icon: "🌐", label: "Website",     value: patient.website },
    {
      icon: "📍",
      label: "Address",
      value: `${patient.address.street}, ${patient.address.suite}, ${patient.address.city} - ${patient.address.zipcode}`,
    },
    { icon: "🏢", label: "Company",     value: patient.company.name },
    { icon: "💬", label: "Catchphrase", value: patient.company.catchPhrase },
  ];

  return (
    <div style={styles.page}>
      <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
        ← Back to Dashboard
      </button>

      <div style={styles.detailCard}>
        <div style={styles.detailCardHeader}>
          <div style={{ ...styles.avatarLg, background: `hsl(${patient.id * 36}, 70%, 50%)` }}>
            {patient.name[0]}
          </div>
          <div>
            <h2 style={styles.detailName}>{patient.name}</h2>
            <p style={styles.detailUsername}>@{patient.username}</p>
            <span style={styles.detailIdBadge}>Patient ID: #{patient.id}</span>
          </div>
        </div>

        <div style={styles.detailGrid}>
          {fields.map((field) => (
            <div key={field.label} style={styles.detailItem}>
              <span style={styles.detailItemIcon}>{field.icon}</span>
              <div>
                <p style={styles.detailItemLabel}>{field.label}</p>
                <p style={styles.detailItemValue}>{field.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientDetails;