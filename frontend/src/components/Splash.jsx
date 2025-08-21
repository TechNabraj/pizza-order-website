import { useEffect, useState } from "react";
import logo from "../assets/images/logo.jpg"; // make sure this exists in src/assets/images

const quotes = [
  "Where every slice tells a story.",
  "Crafted with love, baked to perfection.",
  "A slice of happiness in every bite."
];

export default function Splash({ onFinish }) {
  const [fade, setFade] = useState(false);
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFade(true), 2500); // start fade at 2.5s
    const hideTimer = setTimeout(onFinish, 3000); // fully hide after 3s
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [onFinish]);

  return (
    <div className={`splash ${fade ? "fade-out" : ""}`}>
      <img src={logo} alt="Komorebi Pizza" className="splash-logo" />
      <p className="splash-quote">{randomQuote}</p>
    </div>
  );
}
