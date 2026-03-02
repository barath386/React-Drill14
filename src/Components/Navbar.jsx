import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import styles from "../styles/styles";

function Navbar() {
  const { loggedUser } = useContext(PatientContext);
  const location = useLocation();

  const navLinks = [
    { label: "Dashboard",        path: "/dashboard" },
    { label: "Patients",         path: "/patients" },
    { label: "Performance Test", path: "/performance-test" },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.navBrand}>
        <span style={styles.navLogo}>⚕</span>
        <span style={styles.navTitle}>MedTrack</span>
      </div>

      <div style={styles.navLinks}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              ...styles.navLink,
              ...(location.pathname === link.path ? styles.navLinkActive : {}),
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {loggedUser && (
        <div style={styles.navUserBox}>
          Welcome Patient:{" "}
          <strong style={styles.navUserName}>{loggedUser.name}</strong>
        </div>
      )}
    </nav>
  );
}

export default Navbar;