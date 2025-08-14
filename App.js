// src/App.js
import React, { useEffect, useState } from "react";
import logo from "./assets/images/logo.jpg"; // ← change to .png if needed

export default function App() {
  const [data, setData] = useState({ ok: false, message: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api"); // uses proxy -> http://localhost:5000/api
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, Arial, sans-serif" }}>
      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <img
          src={logo}
          alt="Komorebi Logo"
          style={{ width: 120, height: "auto", borderRadius: 8 }}
        />
        <div>
          <h1 style={{ margin: 0 }}>Komorebi Pizza Order Website</h1>
          <p style={{ margin: "4px 0 0", color: "#555" }}>
            Welcome! Frontend ↔ Backend connection check below.
          </p>
        </div>
      </header>

      {/* API status card */}
      <section
        style={{
          marginTop: 24,
          padding: 16,
          border: "1px solid #eee",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          maxWidth: 560,
        }}
      >
        <h2 style={{ marginTop: 0, fontSize: 18 }}>API Status</h2>

        {loading && <p>Loading…</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {!loading && !error && (
          <div>
            <p>
              <strong>ok:</strong> {String(data.ok)}
            </p>
            <p>
              <strong>message:</strong> {data.message}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
