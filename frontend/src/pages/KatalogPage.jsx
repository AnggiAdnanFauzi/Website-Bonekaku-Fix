import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../config/axios";
import API_BASE from "../config/api";

export default function KatalogPage() {
  const [initialKatalogs, setInitialKatalogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    document.title = "Katalog - BonekaKu";
    api.get("/katalog").then(r => setInitialKatalogs(r.data.data || r.data));
    const doReveal = () => {
      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', doReveal, {passive:true});
    setTimeout(doReveal, 150);
    return () => window.removeEventListener('scroll', doReveal);
  }, []);

  const filteredKatalogs = initialKatalogs.filter(k => {
    if (filter === "all") return true;
    if (filter === "most-favorite") return k.is_bestseller;
    if (filter === "animal") return k.category === "Animal Series";
    if (filter === "bantal") return k.category === "Bantal Custom" || k.category === "Bantal Desain";
    if (filter === "souvenir") return k.category === "Boneka Souvenir" || k.category === "Souvenir Desain";
    if (filter === "custom") return k.category === "Boneka Custom" || k.category === "Boneka Desain";
    if (filter === "graduation") return k.category === "Graduation Series";
    if (filter === "maskot") return k.category === "Maskot / Badut";
    if (filter === "masker") return k.category === "Masker";
    if (filter === "new-animal") return k.category === "New Animal Series";
    if (filter === "new-produk") return k.category === "New Produk";
    return true;
  }).slice(0, limit);

  return (
    <>
      <section className="special-section" style={{ paddingTop: "150px", paddingBottom: "80px", textAlign: "center" }}>
        <div className="container reveal-up">
          <span className="section-badge" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", display: "inline-block", marginBottom: "15px", padding: "6px 16px", borderRadius: "50px", fontWeight: "700" }}>Produk Kami</span>
          <h1 className="section-title-main" style={{ color: "#fff", fontSize: "3rem" }}>Katalog <span style={{ color: "var(--secondary)" }}>Boneka Souvenir</span></h1>
          <p className="section-subtitle" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem" }}>Temukan berbagai pilihan boneka, bantal, dan souvenir custom berkualitas dengan desain menarik untuk kebutuhan promosi atau event spesial Anda.</p>
        </div>
      </section>

      <section className="katalog-page-section" id="katalog" style={{ padding: "60px 0 100px" }}>
        <div className="container katalog-page-container">
          <div className="katalog-filters reveal-up" style={{ display: "flex", gap: "15px", marginBottom: "25px", flexWrap: "wrap" }}>
            <div className="kategori-dropdown-wrap" style={{ marginBottom: "0", flex: "1", minWidth: "250px" }}>
              <label htmlFor="kategoriSelect" className="kategori-dropdown-label">
                <i className="fas fa-filter"></i> Filter Kategori
              </label>
              <select id="kategoriSelect" className="kategori-select" value={filter} onChange={e => setFilter(e.target.value)}>
                <option value="all">Semua Produk ({initialKatalogs.length})</option>
                <option value="most-favorite">Most Favorite ({initialKatalogs.filter(k => k.is_bestseller).length})</option>
                <option value="animal">Animal Series ({initialKatalogs.filter(k => k.category === "Animal Series").length})</option>
                <option value="new-animal">New Animal Series ({initialKatalogs.filter(k => k.category === "New Animal Series").length})</option>
                <option value="new-produk">New Produk ({initialKatalogs.filter(k => k.category === "New Produk").length})</option>
                <option value="bantal">Bantal Custom ({initialKatalogs.filter(k => k.category === "Bantal Custom" || k.category === "Bantal Desain").length})</option>
                <option value="souvenir">Boneka Souvenir ({initialKatalogs.filter(k => k.category === "Boneka Souvenir" || k.category === "Souvenir Desain").length})</option>
                <option value="custom">Boneka Custom ({initialKatalogs.filter(k => k.category === "Boneka Custom" || k.category === "Boneka Desain").length})</option>
                <option value="graduation">Graduation Series ({initialKatalogs.filter(k => k.category === "Graduation Series").length})</option>
                <option value="maskot">Maskot / Badut ({initialKatalogs.filter(k => k.category === "Maskot / Badut").length})</option>
                <option value="masker">Masker ({initialKatalogs.filter(k => k.category === "Masker").length})</option>
              </select>
            </div>

            <div className="kategori-dropdown-wrap" style={{ marginBottom: "0", flex: "1", minWidth: "200px" }}>
              <label htmlFor="limitSelect" className="kategori-dropdown-label">
                <i className="fas fa-list-ol"></i> Jumlah Tampil
              </label>
              <select id="limitSelect" className="kategori-select" value={limit} onChange={e => setLimit(Number(e.target.value))}>
                <option value="10">10 Produk</option>
                <option value="50">50 Produk</option>
                <option value="100">100 Produk</option>
                <option value="9999">Semua Produk</option>
              </select>
            </div>
          </div>

          <div className="katalog-main-content">
            <div className="katalog-grid reveal-up">
              {filteredKatalogs.map(katalog => {
                let imgSrc = "/Icon-001b.png";
                const img = katalog.image_url || katalog.image;
                if (img) {
                    if (img.startsWith('http') || img.startsWith('data:')) {
                        imgSrc = img;
                    } else if (img.startsWith('katalog/')) {
                        imgSrc = `${API_BASE}/storage/${img}`;
                    } else {
                        imgSrc = img.startsWith('/') ? img : '/' + img;
                    }
                }
                return (
                  <div key={katalog.id} className="ecommerce-card">
                    <div className="ecommerce-img">
                      <img src={imgSrc} alt={katalog.name} loading="lazy" />
                    </div>
                    <div className="ecommerce-details">
                      <h4>{katalog.name}</h4>
                      <div className="ecommerce-actions" style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                        <Link to={`/katalog/${katalog.id}`} className="btn btn-secondary btn-sm btn-detail" style={{ flex: "1", padding: "10px 5px", fontSize: "0.85rem", display: "inline-block", textAlign: "center", textDecoration: "none" }}><i className="fas fa-info-circle"></i> Detail</Link>
                        <a href="https://wa.me/6281385508611" className="btn btn-primary btn-sm btn-wa" target="_blank" rel="noreferrer" style={{ flex: "1", padding: "10px 5px", fontSize: "0.85rem" }}>
                          <i className="fab fa-whatsapp"></i> Pesan
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {filteredKatalogs.length === 0 && (
              <div style={{ textAlign: "center", padding: "50px", color: "#888" }}>
                Produk tidak ditemukan.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
