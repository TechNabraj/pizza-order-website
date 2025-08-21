import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [msg, setMsg] = useState("");
  const [showPasswordHint, setShowPasswordHint] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();

    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      setMsg("Passwords do not match!");
      return;
    }

    // Password rule: at least 8 chars, 1 uppercase, 1 number, 1 special char
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordPattern.test(form.password)) {
      setMsg("Password must be at least 8 characters long, include an uppercase letter, a number, and a special character (!@#$%^&*).");
      return;
    }

    setMsg("Registering...");
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password
      };

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setMsg("Registered! You can login now.");
    } catch (err) {
      setMsg(err.message);
    }
  }

  // Show hint for 3 seconds when clicking password field
  const handlePasswordFocus = () => {
    setShowPasswordHint(true);
    setTimeout(() => setShowPasswordHint(false), 3000);
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2 style={{ marginTop: 0, color: "var(--komorebi-deep-tomato)" }}>Create account</h2>
        <form onSubmit={onSubmit}>
          <label className="label">Name</label>
          <input
            className="input"
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />

          <label className="label" style={{ marginTop: 12 }}>Email</label>
          <input
            className="input"
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />

          <label className="label" style={{ marginTop: 12 }}>Phone</label>
          <input
            className="input"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            pattern="[0-9]{8,15}"
            title="Please enter a valid phone number (8–15 digits only)."
          />

          <label className="label" style={{ marginTop: 12 }}>Password</label>
          <input
            className="input"
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            onFocus={handlePasswordFocus}
            required
          />
          {showPasswordHint && (
            <small style={{ color: "#666" }}>
              Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character (!@#$%^&*).
            </small>
          )}

          <label className="label" style={{ marginTop: 12 }}>Re-enter Password</label>
          <input
            className="input"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
            required
          />

          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <button className="btn" type="submit">Register</button>
            <button
              className="btn secondary"
              type="button"
              onClick={() => (window.location.href = "/login")}
            >
              Go to login
            </button>
          </div>
        </form>
        {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      </div>
    </div>
  );
}
