import { useEffect } from "react";
import Particles from "../components/Particles";

export default function TentangKamiPage() {
  useEffect(() => {
    document.title = "Tentang Kami - BonekaKu";
    const doReveal = () => {
      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', doReveal, { passive: true });
    setTimeout(doReveal, 150);
    return () => window.removeEventListener('scroll', doReveal);
  }, []);

  return (
    <>
      <div className="page-spacing" style={{ height: "100px" }}></div>
      <section className="tentang-kami-section" style={{ padding: "80px 0", background: "#fff", position: "relative" }}>
        <Particles />
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="tentang-kami-container" style={{ display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" }}>
            <div className="tentang-kami-content reveal-left" style={{ flex: "1 1 400px" }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2.5rem", color: "var(--primary-dark)", marginBottom: "20px", textTransform: "uppercase" }}>SELAMAT DATANG DI BONEKAKU.ID</h2>
              <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "15px", lineHeight: 1.8 }}><strong>Ingin membuat souvenir yang unik?</strong></p>
              <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "15px", lineHeight: 1.8 }}><strong>Souvenir yang mewakili produk/ perusahaan anda dihadapan konsumen? dan yang disukai banyak orang?</strong></p>
              <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "15px", lineHeight: 1.8 }}>Anda sudah benar. Boneka-boneka lucu, boneka custom, bantal karakter, bantal custom dapat menjadi pilihan souvenir yang cocok untuk promosi.</p>
              <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "15px", lineHeight: 1.8 }}>Kami memiliki aneka pilihan model dan desain yang dapat menghiasi momen spesial anda seperti untuk promo produk, acara perusahaan, wedding, ulang tahun, baby shower, wisuda dan lain-lain.</p>
              <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "15px", lineHeight: 1.8 }}>Di <b>BONEKAKU.ID</b> kebutuhan souvenir anda dapat kami wujudkan dalam bentuk boneka, bantal, tas, maskot ataupun badut.</p>
              <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", marginBottom: "15px", lineHeight: 1.8 }}>Berikanlah konsumen dan tamu anda dengan souvenir yang tak terlupakan.</p>
            </div>
            <div className="tentang-kami-image reveal-right active" style={{ flex: "1 1 400px", textAlign: "center" }}>
              <div className="stack-container">
                <div className="stack-card sc-1"><img src="/Tas-Branding-2.jpeg" alt="Boneka Souvenir" /></div>
                <div className="stack-card sc-2"><img src="/Vico-Bear.png" alt="Maskot Boneka" /></div>
                <div className="stack-card sc-3"><img src="/Boneka_Custome.png" alt="Boneka Custom" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kunjungi-kami-section" style={{ padding: "80px 0", background: "#f8fcf5", textAlign: "center" }}>
        <div className="container">
          <h2 className="reveal-up" style={{ fontFamily: "var(--font-heading)", fontSize: "2.2rem", color: "var(--primary-dark)", marginBottom: "20px" }}>Kunjungi dan Hubungi Kami</h2>
          <div className="social-links reveal-up" style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "40px" }}>
            <a href="https://www.facebook.com/kajian.teori" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "50px", height: "50px", background: "var(--primary)", color: "#fff", borderRadius: "50%", fontSize: "1.3rem" }}><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.youtube.com/channel/UC75Vkq4Oct5MQTG-23MTm2A" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "50px", height: "50px", background: "var(--primary)", color: "#fff", borderRadius: "50%", fontSize: "1.3rem" }}><i className="fab fa-youtube"></i></a>
            <a href="https://www.instagram.com/bonekaku_store/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "50px", height: "50px", background: "var(--primary)", color: "#fff", borderRadius: "50%", fontSize: "1.3rem" }}><i className="fab fa-instagram"></i></a>
          </div>
          <div className="kunjungi-kami-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "30px" }}>
            <div className="kunjungi-item reveal-up" style={{ transitionDelay: "0.1s", background: "#fff", padding: "40px 30px", borderRadius: "var(--radius-lg)", boxShadow: "0 5px 20px rgba(0,0,0,0.05)" }}>
              <div className="kunjungi-icon" style={{ width: "70px", height: "70px", background: "var(--bg-light)", color: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 20px" }}><i className="far fa-building"></i></div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", marginBottom: "15px", color: "var(--primary-dark)" }}>Office</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>Jl. Katelia Raya Blok AS-3 No. 35, Jl. Raya Kranggan, RT.006/RW.014, Jatisampurna, Kec. Jatisampurna, Kota Bks, Jawa Barat 17433</p>
            </div>
            <div className="kunjungi-item reveal-up" style={{ transitionDelay: "0.2s", background: "#fff", padding: "40px 30px", borderRadius: "var(--radius-lg)", boxShadow: "0 5px 20px rgba(0,0,0,0.05)" }}>
              <div className="kunjungi-icon" style={{ width: "70px", height: "70px", background: "var(--bg-light)", color: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 20px" }}><i className="fas fa-tools"></i></div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", marginBottom: "15px", color: "var(--primary-dark)" }}>Workshop</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>Jln. Bogor-Bekasi No.61 Ciketing Udik, Bantar Gebang, Bekasi.</p>
            </div>
            <div className="kunjungi-item reveal-up" style={{ transitionDelay: "0.3s", background: "#fff", padding: "40px 30px", borderRadius: "var(--radius-lg)", boxShadow: "0 5px 20px rgba(0,0,0,0.05)" }}>
              <div className="kunjungi-icon" style={{ width: "70px", height: "70px", background: "var(--bg-light)", color: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 20px" }}><i className="fas fa-phone-alt"></i></div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", marginBottom: "15px", color: "var(--primary-dark)" }}>Hot Line</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>0813-8550-8611</p>
            </div>
            <div className="kunjungi-item reveal-up" style={{ transitionDelay: "0.4s", background: "#fff", padding: "40px 30px", borderRadius: "var(--radius-lg)", boxShadow: "0 5px 20px rgba(0,0,0,0.05)" }}>
              <div className="kunjungi-icon" style={{ width: "70px", height: "70px", background: "var(--bg-light)", color: "var(--primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", margin: "0 auto 20px" }}><i className="far fa-envelope-open"></i></div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", marginBottom: "15px", color: "var(--primary-dark)" }}>Email</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>marketingbonekaku@gmail.com</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
