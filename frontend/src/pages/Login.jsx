import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", roleChoice: "customer" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("Logging in...");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save token & basic user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Simple redirect logic by chosen role (UI only)
      if (form.roleChoice === "adminStaff") {
        setMsg("Logged in (admin/staff). Redirect to /dashboard (to be built)...");
        // window.location.href = "/dashboard"; // when you build it
      } else {
        setMsg("Logged in (customer). Redirect to /menu...");
        window.location.href = "/menu";
      }
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
        <h2 style={{ marginTop: 0, color: "var(--komorebi-deep-tomato)" }}>Login</h2>
        <form onSubmit={onSubmit}>
          <label className="label">Email</label>
          <input className="input" name="email" type="email" value={form.email} onChange={onChange} required />

          <label className="label" style={{ marginTop: 12 }}>Password</label>
          <input className="input" name="password" type="password" value={form.password} onChange={onChange} required />

          <label className="label" style={{ marginTop: 12 }}>Login as</label>
          <select className="select" name="roleChoice" value={form.roleChoice} onChange={onChange}>
            <option value="adminStaff">Admin / Staff</option>
            <option value="customer">Customer / User</option>
          </select>

          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <button className="btn" type="submit">Login</button>
            <button className="btn ghost" type="button" onClick={()=> (window.location.href="/register")}>Create account</button>
          </div>
        </form>
        {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      </div>
    </div>
  );
}
