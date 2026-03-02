import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PatientProvider } from "./context/PatientContext";
import Navbar from "./Components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetails from "./pages/PatientDetails";
import PerformanceTest from "./pages/PerformanceTest";
import styles from "./styles/styles";

function App() {
  return (
    <PatientProvider>
      <BrowserRouter>
        <div style={styles.app}>
          <Routes>
            {/* Login — no Navbar */}
            <Route path="/login" element={<Login />} />

            {/* Protected pages — with Navbar */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/dashboard"            element={<Dashboard />}       />
                    <Route path="/patients"             element={<Patients />}        />
                    <Route path="/patient-details/:id"  element={<PatientDetails />}  />
                    <Route path="/performance-test"     element={<PerformanceTest />} />
                    <Route path="*"                     element={<Navigate to="/login" />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </PatientProvider>
  );
}

export default App;