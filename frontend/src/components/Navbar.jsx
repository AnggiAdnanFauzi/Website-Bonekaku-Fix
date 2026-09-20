import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const doReveal = () => {
      const reveals = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-top");
      reveals.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) {
          el.classList.add("active");
        }
      });
    };

    setTimeout(doReveal, 100);
    window.addEventListener("scroll", doReveal, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    doReveal();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", doReveal);
    };
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.classList.add("nav-open");
    } else {
      document.body.classList.remove("nav-open");
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.classList.remove("nav-open");
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container nav-container">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img src="/Logo-Baru-Bonekaku-1030x279.png" alt="Logo Bonekaku" />
          </Link>
          <nav className="nav-links">
            <Link to="/" className={pathname === "/" ? "active" : ""}>Home</Link>
            <Link to="/katalog" className={pathname === "/katalog" ? "active" : ""}>Katalog</Link>
            <Link to="/layanan" className={pathname === "/layanan" ? "active" : ""}>Layanan</Link>
            <Link to="/tentang-kami" className={pathname === "/tentang-kami" ? "active" : ""}>Tentang Kami</Link>
            <Link to="/kontak-kami" className={pathname === "/kontak-kami" ? "active" : ""}>Kontak Kami</Link>
            <Link to="/artikel" className={pathname === "/artikel" ? "active" : ""}>Artikel</Link>
          </nav>
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? "open" : ""}`} 
            aria-label="Buka menu navigasi" 
            aria-expanded={isMobileMenuOpen ? "true" : "false"}
            onClick={toggleMobileMenu}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>
      </header>

      <div 
        className={`mobile-nav-overlay ${isMobileMenuOpen ? "open" : ""}`} 
        id="mobileNavOverlay" 
        aria-hidden={!isMobileMenuOpen}
        onClick={closeMenu}
      ></div>

      <nav 
        className={`mobile-nav-drawer ${isMobileMenuOpen ? "open" : ""}`} 
        id="mobileNavDrawer" 
        aria-label="Navigasi mobile"
      >
        <div className="drawer-header">
          <Link to="/" className="drawer-logo" onClick={closeMenu}>
            <img src="/Logo-Baru-Bonekaku-1030x279.png" alt="Logo Bonekaku" />
          </Link>
          <button className="drawer-close" aria-label="Tutup menu" onClick={closeMenu}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="drawer-nav">
          <Link to="/" className={pathname === "/" ? "active" : ""} onClick={closeMenu}><i className="fas fa-home"></i>Home</Link>
          <Link to="/katalog" className={pathname === "/katalog" ? "active" : ""} onClick={closeMenu}><i className="fas fa-th-large"></i>Katalog</Link>
          <Link to="/layanan" className={pathname === "/layanan" ? "active" : ""} onClick={closeMenu}><i className="fas fa-concierge-bell"></i>Layanan</Link>
          <Link to="/tentang-kami" className={pathname === "/tentang-kami" ? "active" : ""} onClick={closeMenu}><i className="fas fa-users"></i>Tentang Kami</Link>
          <Link to="/kontak-kami" className={pathname === "/kontak-kami" ? "active" : ""} onClick={closeMenu}><i className="fas fa-envelope"></i>Kontak Kami</Link>
          <Link to="/artikel" className={pathname === "/artikel" ? "active" : ""} onClick={closeMenu}><i className="fas fa-newspaper"></i>Artikel</Link>
        </div>
        <div className="drawer-footer">
          <a href="https://wa.me/6281385508611" className="drawer-wa-btn" target="_blank" rel="noreferrer">
            <i className="fab fa-whatsapp"></i> Hubungi via WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}