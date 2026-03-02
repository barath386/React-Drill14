import React, { useState, useEffect } from "react";
import axios from "axios";

function PerformanceTest() {

  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // STEP 1 - Normal Function - runs every render
  function fetchPatients() {
    console.log("Normal Function Called");
  }
  fetchPatients();

  // STEP 2 - useEffect - runs only once
  useEffect(() => {
    console.log("useEffect Called");
  }, []);

  // STEP 4 - Correct API Method - single call
  useEffect(() => {
    console.log("Correct Method - API Call Started");
    axios.get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
        console.log("Correct Method - API Call Success - Total Users:", res.data.length);
      });
  }, []);

  return (
    <div style={styles.page}>

      <h2 style={styles.title}>Performance Test</h2>
      <p style={styles.subtitle}>
        Open <strong>F12 Console</strong> to see all 4 steps running live.
      </p>

      <div style={styles.instructionBox}>
        <h3 style={styles.instructionTitle}>
          Check Console (F12) for these outputs:
        </h3>
        <p style={styles.instructionDesc}>
          Press <kbd style={styles.kbd}>F12</kbd> then click the{" "}
          <strong>Console</strong> tab.
        </p>

        <div style={styles.stepsGrid}>

          <div style={styles.stepItem}>
            <span style={styles.stepNum}>1</span>
            <div>
              <p style={styles.stepName}>Normal Function</p>
              <p style={styles.stepLog}>Normal Function Called</p>
              <p style={styles.stepNote}>
                Prints every time state changes
              </p>
            </div>
          </div>

          <div style={styles.stepItem}>
            <span style={styles.stepNum}>2</span>
            <div>
              <p style={styles.stepName}>useEffect</p>
              <p style={styles.stepLog}>useEffect Called</p>
              <p style={styles.stepNote}>
                Prints only once on page load
              </p>
            </div>
          </div>

          <div style={styles.stepItem}>
            <span style={styles.stepNum}>3</span>
            <div>
              <p style={styles.stepName}>Wrong API Method</p>
              <p style={styles.stepLog}>axios.get() outside useEffect</p>
              <p style={styles.stepNote}>
                Causes infinite loop — not run here
              </p>
            </div>
          </div>

          <div style={styles.stepItem}>
            <span style={styles.stepNum}>4</span>
            <div>
              <p style={styles.stepName}>Correct API Method</p>
              <p style={styles.stepLog}>Correct Method - API Call Success</p>
              <p style={styles.stepNote}>
                Prints once — single API call only
              </p>
            </div>
          </div>

        </div>
      </div>

      <div style={styles.triggerBox}>
        <h3 style={styles.triggerTitle}>
          Test Step 1 — Normal Function
        </h3>
        <p style={styles.triggerDesc}>
          Click the button and watch the console. Every click triggers a
          re-render which calls{" "}
          <code style={styles.code}>fetchPatients()</code> again.
        </p>
        <button
          style={styles.button}
          onClick={() => setCount((c) => c + 1)}
        >
          Trigger Re-render — Clicked {count} Times
        </button>
        <p style={styles.triggerNote}>
          Check console — you will see{" "}
          <strong>"Normal Function Called"</strong> printed every time
          you click.
        </p>
      </div>

      <div style={styles.tableBox}>
        <h3 style={styles.tableTitle}>
          Step 4 Result — API Data Loaded Once
        </h3>
        <p style={styles.tableDesc}>
          This data was fetched using the correct method inside useEffect
          with empty array.
        </p>

        {loading ? (
          <p style={styles.loadingText}>Loading data from API...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.name}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    maxWidth: 960,
    margin: "0 auto",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e293b",
    margin: "0 0 8px",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 28,
    lineHeight: 1.6,
  },
  instructionBox: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  instructionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e293b",
    margin: "0 0 8px",
  },
  instructionDesc: {
    fontSize: 14,
    color: "#64748b",
    margin: "0 0 20px",
    lineHeight: 1.6,
  },
  kbd: {
    backgroundColor: "#f1f5f9",
    border: "1px solid #cbd5e1",
    borderRadius: 4,
    padding: "2px 8px",
    fontSize: 13,
    fontFamily: "Courier New, monospace",
    color: "#1e293b",
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  stepItem: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 10,
    padding: 16,
  },
  stepNum: {
    backgroundColor: "#2c7be5",
    color: "#ffffff",
    borderRadius: "50%",
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: "bold",
    flexShrink: 0,
  },
  stepName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e293b",
    margin: "0 0 6px",
  },
  stepLog: {
    fontSize: 12,
    fontFamily: "Courier New, monospace",
    backgroundColor: "#0f172a",
    color: "#4ade80",
    padding: "4px 10px",
    borderRadius: 4,
    margin: "0 0 6px",
    display: "inline-block",
  },
  stepNote: {
    fontSize: 12,
    color: "#94a3b8",
    margin: 0,
  },
  triggerBox: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  triggerTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e293b",
    margin: "0 0 8px",
  },
  triggerDesc: {
    fontSize: 14,
    color: "#475569",
    margin: "0 0 16px",
    lineHeight: 1.6,
  },
  triggerNote: {
    fontSize: 13,
    color: "#64748b",
    margin: "12px 0 0",
    lineHeight: 1.6,
  },
  button: {
    backgroundColor: "#2c7be5",
    color: "#ffffff",
    border: "none",
    borderRadius: 8,
    padding: "10px 24px",
    fontSize: 14,
    fontWeight: "600",
    cursor: "pointer",
  },
  code: {
    backgroundColor: "#f1f5f9",
    border: "1px solid #e2e8f0",
    borderRadius: 4,
    padding: "1px 6px",
    fontSize: 12,
    fontFamily: "Courier New, monospace",
    color: "#0f172a",
  },
  tableBox: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  tableTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e293b",
    margin: "0 0 8px",
  },
  tableDesc: {
    fontSize: 14,
    color: "#475569",
    margin: "0 0 16px",
    lineHeight: 1.6,
  },
  loadingText: {
    fontSize: 14,
    color: "#64748b",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#f8fafc",
    padding: "11px 16px",
    textAlign: "left",
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    borderBottom: "1px solid #e2e8f0",
  },
  td: {
    padding: "11px 16px",
    fontSize: 13,
    color: "#334155",
    borderBottom: "1px solid #f1f5f9",
  },
};

export default PerformanceTest;