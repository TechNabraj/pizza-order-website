import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Splash from "./components/Splash";
import "./components/Splash.css";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrackOrder from "./pages/TrackOrder";  // ✅ Added import

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <BrowserRouter>
      {showSplash ? (
        <Splash onFinish={() => setShowSplash(false)} />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/track-order" element={<TrackOrder />} /> {/* ✅ Added route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}
