import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../context/PatientContext";
import styles from "../styles/styles";

function Login() {
  const { setLoggedUser } = useContext(PatientContext);
  const navigate = useNavigate();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    const errs = {};
    if (!email.trim())
      errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      errs.email = "Enter a valid email address";
    if (!password.trim())
      errs.password = "Password is required";
    return errs;
  };

  const handleLogin = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    if (email === "patient@test.com" && password === "123456") {
      setLoading(true);
      setTimeout(() => {
        setLoggedUser({ name: "John", email });
        navigate("/dashboard");
      }, 800);
    } else {
      setErrors({ auth: "Invalid credentials. Use patient@test.com / 123456" });
    }
  };

  return (
    <div style={styles.loginBg}>
      <div style={styles.loginCard}>
        <div style={styles.loginIcon}>⚕</div>
        <h1 style={styles.loginTitle}>MedTrack</h1>
        <p style={styles.loginSubtitle}>Patient Portal Login</p>

        {errors.auth && (
          <div style={styles.errorBanner}>{errors.auth}</div>
        )}

        <div style={styles.formField}>
          <label style={styles.formLabel}>Email Address</label>
          <input
            type="email"
            placeholder="patient@test.com"
            value={email}
            style={{
              ...styles.formInput,
              ...(errors.email ? styles.formInputError : {}),
            }}
            onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {errors.email && <span style={styles.formErrMsg}>{errors.email}</span>}
        </div>

        <div style={styles.formField}>
          <label style={styles.formLabel}>Password</label>
          <input
            type="password"
            placeholder="••••••"
            value={password}
            style={{
              ...styles.formInput,
              ...(errors.password ? styles.formInputError : {}),
            }}
            onChange={(e) => { setPassword(e.target.value); setErrors({}); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {errors.password && <span style={styles.formErrMsg}>{errors.password}</span>}
        </div>

        <button
          style={{ ...styles.loginBtn, opacity: loading ? 0.7 : 1 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Authenticating..." : "Sign In"}
        </button>

        <p style={styles.loginHint}>
          Demo:{" "}
          <code style={styles.inlineCode}>patient@test.com</code> /{" "}
          <code style={styles.inlineCode}>123456</code>
        </p>
      </div>
    </div>
  );
}

export default Login;