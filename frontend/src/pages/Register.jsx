import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", accountType: "customer" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("Registering...");
    try {
      const payload = { name: form.name, email: form.email, phone: form.phone, password: form.password };

      // NOTE: backend /api/auth/register currently ignores role and makes 'customer'
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

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2 style={{ marginTop: 0, color: "var(--komorebi-deep-tomato)" }}>Create account</h2>
        <form onSubmit={onSubmit}>
          <label className="label">Name</label>
          <input className="input" name="name" value={form.name} onChange={onChange} required />

          <label className="label" style={{ marginTop: 12 }}>Email</label>
          <input className="input" type="email" name="email" value={form.email} onChange={onChange} required />

          <label className="label" style={{ marginTop: 12 }}>Phone</label>
          <input className="input" name="phone" value={form.phone} onChange={onChange} />

          <label className="label" style={{ marginTop: 12 }}>Password</label>
          <input className="input" type="password" name="password" value={form.password} onChange={onChange} required />

          <label className="label" style={{ marginTop: 12 }}>Account type</label>
          <select className="select" name="accountType" value={form.accountType} onChange={onChange}>
            <option value="customer">Customer / User</option>
            <option value="adminStaff">Admin / Staff (request)</option>
          </select>
          <small style={{ color:"#666" }}>
            Note: Admin/Staff creation is handled by Admin in the system. Public sign-ups are Customer accounts.
          </small>

          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <button className="btn" type="submit">Register</button>
            <button className="btn secondary" type="button" onClick={()=> (window.location.href="/login")}>Go to login</button>
          </div>
        </form>
        {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      </div>
    </div>
  );
}
