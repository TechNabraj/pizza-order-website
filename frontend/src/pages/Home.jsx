// src/pages/Home.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import "./Home.css";

// ---- Hero images ----
import hero1 from "../assets/images/hero-1.webp";
import hero2 from "../assets/images/hero-2.webp";
import hero3 from "../assets/images/hero-3.webp";
import hero4 from "../assets/images/hero-4.webp";
import hero5 from "../assets/images/hero-5.webp"; // optional

// ---- Promo images ----
import promoBox1 from "../assets/images/promo-box-1.webp";
import promoBox2 from "../assets/images/promo-box-2.webp";
import promoTable1 from "../assets/images/promo-table-1.webp";
import promoTable2 from "../assets/images/promo-table-2.webp";

export default function Home() {
  const slides = useMemo(
  () => [
    { src: hero1, caption: "Most stable relationship? Pizza.", subCaption: "From oven to box — warm, fast, perfect." },
    { src: hero2, caption: "Wood-Fired Goodness", subCaption: "Smoky crust, golden cheese." },
    { src: hero3, caption: "Baked the Right Way", subCaption: "From oven to box — warm, fast, perfect." },
    { src: hero4, caption: "Pizza & Wine Nights", subCaption: "Pair your slice with the perfect sip." },
    { src: hero5, caption: "Friends. Slices. Memories.", subCaption: "Every bite tells a story." },
  ],
  []
);
  return (
    <>
      <InlineStyles />

      <div className="page">
        <div className="page-body">
          <section className="hero">
            <HeroCarousel slides={slides} intervalMs={3000} />
          </section>

          {/* CTA under slider (keeps slider layout unchanged) */}
          <section className="heroCtaWrap">
            <div className="heroCta container">
              <p className="heroKicker">Fresh • Wood-Fired • Fast</p>
              <div className="heroCtas">
                <a href="/menu" className="btnPrimary">Order Now</a>
                <a href="/menu" className="btnGhost">View Menu</a>
              </div>
            </div>
          </section>

          <section className="container">
            <h2 className="sectionTitle">Today’s Highlights</h2>
            <PromoGrid />
          </section>

          <section className="about">
            <div className="container aboutInner">
              <h3>Komorebi — Fresh • Warm • Authentic</h3>
              <p>
                Where fresh ingredients meet traditional Italian craftsmanship
                under the gentle warmth of filtered sunlight. Experience the perfect
                slice — dough made daily, slow-cooked sauces, and our wood-fired
                finish.
              </p>
            </div>
          </section>
        </div>

        <Footer /> {/* sticky footer */}
      </div>
    </>
  );
}

/* ---------------------- Hero Carousel ---------------------- */
function HeroCarousel({ slides, intervalMs = 3000 }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIdx((n) => (n + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [intervalMs, slides.length]);

  const stop = () => timerRef.current && clearInterval(timerRef.current);
  const restart = () => {
    stop();
    timerRef.current = setInterval(() => {
      setIdx((n) => (n + 1) % slides.length);
    }, intervalMs);
  };

  const go = (n) => {
    stop();
    setIdx((n + slides.length) % slides.length);
    restart();
  };

  return (
    <div className="slider" onMouseEnter={stop} onMouseLeave={restart}>
      <div className="slide">
        <img
          src={slides[idx].src}
          alt={slides[idx].caption}
          className="slideImg"
        />
        <div className="slideCaption">
  <div className="captionMain">{slides[idx].caption}</div>
  <div className="captionSub">{slides[idx].subCaption}</div>
</div>

      </div>

      <button className="navBtn left" aria-label="Previous" onClick={() => go(idx - 1)}>‹</button>
      <button className="navBtn right" aria-label="Next" onClick={() => go(idx + 1)}>›</button>

      <div className="dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === idx ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------- Promo Grid ---------------------- */
function PromoGrid() {
  const promos = [
    { src: promoBox1, title: "Box Deals", text: "Perfect for sharing." },
    { src: promoBox2, title: "Family Feast", text: "Value + variety." },
    { src: promoTable1, title: "Table Specials", text: "Dine-in favourites." },
    { src: promoTable2, title: "Weekend Nights", text: "Good vibes only." },
  ];

  return (
    <div className="grid">
      {promos.map((p, i) => (
        <article className="card" key={i}>
          <div className="cardImgWrap">
            <img src={p.src} alt={p.title} className="cardImg" />
          </div>
          <div className="cardBody">
            <h4>{p.title}</h4>
            <p>{p.text}</p>
            <button className="btn">Order Now</button>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ---------------------- Footer ---------------------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <p>© 2025 Komorebi Pizza. All rights reserved.</p>
        <div className="socialIcons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
}

/* ---------------------- Inline CSS ---------------------- */
function InlineStyles() {
  return (
    <style>{`
:root{
  --sun: var(--komorebi-sunlight, #ffd700);
  --orange: var(--komorebi-warm-orange, #ff8c42);
  --red: var(--komorebi-pizza-red, #c62d42);
  --cream: var(--komorebi-dough-cream, #f7e7ce);
  --green: var(--komorebi-herb-green, #7fb069);
}

/* page layout to stick footer at bottom */
.page{ min-height: 100vh; display: flex; flex-direction: column; }
.page-body{ flex: 1; }

/* layout helpers */
.container{ max-width: 1200px; margin: 0 auto; padding: 24px 20px; }

/* ---------- HERO ---------- */
.hero{ background: linear-gradient(180deg, rgba(255,215,0,0.08), transparent); }
.slider{
  position: relative;
  width: 100%;
  height: clamp(320px, 45vw, 480px); /* smaller & responsive */
  overflow: hidden;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.slide{ width: 100%; height: 100%; position: relative; }
.slideImg{ width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
.slideCaption{
  position: absolute; left: 24px; bottom: 20px;
  color: #fff; font-weight: 700; font-size: clamp(18px, 3.2vw, 30px);
  text-shadow: 0 2px 14px rgba(0,0,0,0.45);
  background: linear-gradient(90deg, rgba(0,0,0,0.45), rgba(0,0,0,0));
  padding: 8px 14px 8px 12px; border-radius: 8px;
}
.navBtn{
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(0,0,0,0.35); color: #fff; border: 0;
  width: 40px; height: 48px; font-size: 28px; line-height: 1;
  cursor: pointer; border-radius: 8px; transition: background .2s ease;
}
.navBtn:hover{ background: rgba(0,0,0,0.55); }
.navBtn.left{ left: 10px; } .navBtn.right{ right: 10px; }
.dots{
  position: absolute; left: 0; right: 0; bottom: 10px;
  display: flex; gap: 8px; justify-content: center;
}
.dot{ width: 8px; height: 8px; border-radius: 999px; background: rgba(255,255,255,0.6); border: 0; cursor: pointer; }
.dot.active{ background: var(--sun); }

/* --- CTA block placed under the slider (no hero overlay changes) --- */
.heroCtaWrap{
  background: linear-gradient(180deg, rgba(255,215,0,0.08), transparent);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.heroCta{ text-align: center; padding: 14px 20px 20px; }
.heroKicker{ margin: 0 0 10px; font-weight: 700; color: #333; opacity: 0.9; font-size: clamp(14px, 2.4vw, 16px); }
.heroCtas{ display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.btnPrimary{
  background: linear-gradient(90deg, var(--red), var(--orange)); color: #fff; border: 0;
  padding: 9px 16px; border-radius: 999px; font-weight: 800; letter-spacing: .2px; text-decoration: none;
  box-shadow: 0 6px 16px rgba(0,0,0,0.18);
}
.btnPrimary:hover{ filter: brightness(1.05); }
.btnGhost{
  background: transparent; color: var(--red); border: 2px solid var(--red);
  padding: 7px 16px; border-radius: 999px; font-weight: 800; text-decoration: none;
}
.btnGhost:hover{ background: rgba(198,45,66,0.06); }

/* ---------- PROMOS ---------- */
.sectionTitle{ font-size: clamp(22px, 3vw, 28px); font-weight: 800; color: var(--red); margin: 18px 0 10px; }
.grid{ display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; }
.card{
  grid-column: span 12; background: #fff; border: 1px solid rgba(0,0,0,0.06);
  border-radius: 14px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.04);
}
@media (min-width: 680px){ .card{ grid-column: span 6; } }
@media (min-width: 992px){ .card{ grid-column: span 3; } }
.cardImgWrap{ aspect-ratio: 16/10; overflow: hidden; }
.cardImg{ width: 100%; height: 100%; object-fit: cover; display:block; }
.cardBody{ padding: 14px 14px 18px; }
.cardBody h4{ margin: 2px 0 6px; font-weight: 700; }
.cardBody p{ margin: 0 0 10px; color: #444; }
.btn{
  background: linear-gradient(90deg, var(--red), var(--orange));
  color: #fff; border: 0; padding: 8px 14px; border-radius: 999px; cursor: pointer; font-weight: 700;
}

/* ---------- ABOUT ---------- */
.about{ background: linear-gradient(180deg, #fff, var(--cream)); border-top: 1px solid rgba(0,0,0,0.06); }
.aboutInner{ text-align: center; }
.aboutInner h3{ margin: 2px 0 8px; color: var(--red); font-weight: 800; }
.aboutInner p{ max-width: 720px; margin: 0 auto; color: #333; line-height: 1.65; }

/* ---------- FOOTER (sticky) ---------- */
.footer{ background: var(--red); color: #fff; padding: 20px 0; width: 100%; }
.footerContainer{
  max-width: 1200px; margin: 0 auto; padding: 0 20px;
  display: flex; flex-direction: column; align-items: center; gap: 12px;
}
.footer p{ margin: 0; font-size: 14px; }
.socialIcons{ display: flex; gap: 14px; }
.socialIcons a{ color: #fff; font-size: 18px; transition: color 0.2s ease; }
.socialIcons a:hover{ color: var(--sun); }

/* tighten on very small screens */
@media (max-width: 520px){
  .slideCaption{ left: 14px; right: 14px; bottom: 12px; padding: 10px 12px; }
}
  /* two-line caption styling */
.captionMain{
  font-weight: 700;
  font-size: clamp(18px, 3.2vw, 30px);
  line-height: 1.15;
}
.captionSub{
  font-size: clamp(12px, 2vw, 16px);
  font-weight: 500;
  margin-top: 4px;
  opacity: 0.95;
}

    `}</style>
  );
}
