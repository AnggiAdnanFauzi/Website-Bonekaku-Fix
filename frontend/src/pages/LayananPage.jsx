import { useEffect } from "react";

export default function LayananPage() {
  useEffect(() => {
    document.title = "Layanan - Bonekaku";
    const doReveal = () => {
      const reveals = document.querySelectorAll('.reveal-up');
      reveals.forEach((el) => {
        if(el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', doReveal, { passive: true });
    doReveal();
    return () => window.removeEventListener('scroll', doReveal);
  }, []);

  return (
    <>
      <section className="special-section" style={{ paddingTop: "150px", paddingBottom: "80px", textAlign: "center" }}>
        <div className="container reveal-up">
          <span className="section-badge" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", display: "inline-block", marginBottom: "15px", padding: "6px 16px", borderRadius: "50px", fontWeight: 700 }}>Layanan Kami</span>
          <h1 className="section-title-main" style={{ color: "#fff", fontSize: "3rem" }}>Solusi <span style={{ color: "var(--secondary)" }}>Terbaik</span> Untuk Anda</h1>
          <p className="section-subtitle" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem" }}>Berbagai layanan pembuatan boneka dan bantal custom sesuai dengan kebutuhan event atau media promosi Anda.</p>
        </div>
      </section>

      <section className="services" style={{ padding: "100px 0", backgroundColor: "var(--bg-color)" }}>
        <div className="container">
          <div className="bento-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px" }}>
            
            <div className="bento-card reveal-up" style={{ textAlign: "left" }}>
              <div className="icon-wrapper" style={{ margin: "0 0 25px 0", width: "80px", height: "80px" }}>
                <img src="/Icon-001b.png" alt="Boneka Souvenir" style={{ width: "60%", height: "60%", objectFit: "contain" }} />
              </div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "15px", fontFamily: "var(--font-heading)", color: "var(--primary)" }}>Boneka Souvenir</h3>
              <p style={{ marginBottom: "20px", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>Buat anda yang sedang mencari boneka souvenir untuk event-event tertentu dengan desain yang terbaik, aneka model dalam boneka souvenir ini dapat anda pilih. Mulai dari ukuran kecil hingga besar, bulu pendek hingga bulu panjang, duduk ataupun berdiri dapat dilihat dalam koleksi "Boneka Souvenir" by bonekaku.co.id</p>
              <ul style={{ listStyleType: "none", paddingLeft: 0, color: "var(--text-dark)" }}>
                <li style={{ marginBottom: "8px", fontWeight: 600 }}><i className="fas fa-check-circle" style={{ color: "var(--secondary)", marginRight: "8px" }}></i> Classic Bear</li>
                <li style={{ fontWeight: 600 }}><i className="fas fa-check-circle" style={{ color: "var(--secondary)", marginRight: "8px" }}></i> Wisuda / Graduation Series</li>
              </ul>
            </div>

            <div className="bento-card reveal-up" style={{ textAlign: "left", transitionDelay: "0.1s" }}>
              <div className="icon-wrapper" style={{ margin: "0 0 25px 0", width: "80px", height: "80px" }}>
                <img src="/Icon-002b.png" alt="Bantal" style={{ width: "60%", height: "60%", objectFit: "contain" }} />
              </div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "15px", fontFamily: "var(--font-heading)", color: "var(--primary)" }}>Bantal</h3>
              <p style={{ marginBottom: "20px", fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>Selain untuk tidur, bantal juga dapat dijadikan media promosi yang menarik dan efektif. Tidak percaya? Bonekaku.co.id menyediakan alternatif dan berbagai desain bantal yang dapat anda pilih.</p>
              <ul style={{ listStyleType: "none", paddingLeft: 0, color: "var(--text-dark)" }}>
                <li style={{ marginBottom: "8px", fontWeight: 600 }}><i className="fas fa-check-circle" style={{ color: "var(--secondary)", marginRight: "8px" }}></i> Bantal Sofa</li>
                <li style={{ marginBottom: "8px", fontWeight: 600 }}><i className="fas fa-check-circle" style={{ color: "var(--secondary)", marginRight: "8px" }}></i> Bantal Tulang / Dog Bone Pillow</li>
                <li style={{ marginBottom: "8px", fontWeight: 600 }}><i className="fas fa-check-circle" style={{ color: "var(--secondary)", marginRight: "8px" }}></i> Bantal Leher U</li>
                <li style={{ marginBottom: "8px", fontWeight: 600 }}><i className="fas fa-check-circle" style={{ color: "var(--secondary)", marginRight: "8px" }}></i> Beanbag</li>
                <li style={{ fontWeight: 600 }}><i className="fas fa-check-circle" style={{ color: "var(--secondary)", marginRight: "8px" }}></i> Bantal Customize</li>
              </ul>
            </div>

            <div className="bento-card reveal-up" style={{ textAlign: "left" }}>
              <div className="icon-wrapper" style={{ margin: "0 0 25px 0", width: "80px", height: "80px" }}>
                <img src="/Icon-003b.png" alt="Boneka Custom" style={{ width: "60%", height: "60%", objectFit: "contain" }} />
              </div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "15px", fontFamily: "var(--font-heading)", color: "var(--primary)" }}>Boneka Custom</h3>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>Punya mascot / gimmick andalan? Bingung menjadikannya menarik tidak hanya dalam sebuah logo? Bawa desainnya pada kami, dan kami akan membantu untuk mewujudkannya dalam bentuk boneka yang lucu dan menarik.</p>
            </div>

            <div className="bento-card reveal-up" style={{ textAlign: "left", transitionDelay: "0.1s" }}>
              <div className="icon-wrapper" style={{ margin: "0 0 25px 0", width: "80px", height: "80px" }}>
                <img src="/Icon-004b.png" alt="Maskot Badut" style={{ width: "60%", height: "60%", objectFit: "contain" }} />
              </div>
              <h3 style={{ fontSize: "1.8rem", marginBottom: "15px", fontFamily: "var(--font-heading)", color: "var(--primary)" }}>Maskot/Badut</h3>
              <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "var(--text-muted)" }}>Kami juga menerima pemesanan maskot / badut untuk media promosi. Dengan bahan dan rangka yang kokoh, menjadikan maskot anda tampak lebih hidup dan dapat berinteraksi dengan pengunjung atau orang di sekitarnya.</p>
            </div>

          </div>
          
          <div className="katalog-more reveal-up" style={{ marginTop: "70px", textAlign: "center", borderTop: "1px solid rgba(10,117,188,0.1)", paddingTop: "50px" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.8rem", color: "var(--primary)", marginBottom: "10px" }}>Butuh Layanan Custom Lainnya?</h3>
            <p style={{ marginBottom: "25px", color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>Diskusikan kebutuhan souvenir atau boneka promosi Anda dengan tim ahli kami untuk mendapatkan penawaran terbaik.</p>
            <a href="https://wa.me/6281385508611" className="btn btn-primary btn-lg" target="_blank" rel="noreferrer" style={{ boxShadow: "0 10px 25px rgba(10,117,188,0.3)", padding: "15px 35px", borderRadius: "50px" }}>
              <i className="fab fa-whatsapp" style={{ fontSize: "1.3rem" }}></i> Konsultasikan Sekarang
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
