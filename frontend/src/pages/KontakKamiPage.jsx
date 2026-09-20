import { useEffect } from "react";

export default function KontakKamiPage() {
  useEffect(() => { document.title = "Kontak Kami - BonekaKu";
    const doReveal = () => {
      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', doReveal, {passive:true});
    setTimeout(doReveal, 150);
    return () => window.removeEventListener("scroll", doReveal); }, []);
  return (
    <>
      <div className="page-spacing" style={{ height: "100px" }}></div>
      <div className="reveal-up" style={{ padding: "80px 20px", textAlign: "center", minHeight: "50vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h1 style={{ fontFamily: "var(--font-heading)", color: "var(--primary)", fontSize: "2.5rem", marginBottom: "20px" }}>Informasi Kontak Kami</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto 40px" }}>
          Silakan hubungi kami melalui salah satu saluran di bawah ini, atau Anda bisa langsung melihat informasi pada bagian footer halaman ini.
        </p>
        <a href="https://wa.me/6281385508611" className="btn btn-primary btn-lg" target="_blank" rel="noreferrer" style={{ display: "inline-block", padding: "15px 40px", borderRadius: "50px", fontSize: "1.2rem", boxShadow: "var(--shadow-card)", width: "fit-content", margin: "0 auto" }}>
          <i className="fab fa-whatsapp"></i> Chat WhatsApp Sekarang
        </a>
      </div>
    </>
  );
}
