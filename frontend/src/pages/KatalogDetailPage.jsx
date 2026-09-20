import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../config/axios";

export default function KatalogDetailPage() {
  const { id } = useParams();
  const [katalog, setKatalog] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api.get('/katalog/' + id).then(r => {
      setKatalog(r.data);
      document.title = r.data.name + " - BonekaKu";
    }).catch(() => setNotFound(true));
  }, [id]);

  if (notFound) return (
    <div style={{ textAlign: 'center', padding: '150px 0' }}>
      <h2>Produk tidak ditemukan</h2>
      <Link to="/katalog" className="btn btn-primary" style={{ marginTop: '20px' }}>Kembali ke Katalog</Link>
    </div>
  );
  if (!katalog) return <div style={{ textAlign: 'center', padding: '150px 0' }}>Memuat...</div>;

  return (
    <div style={{ background: "#f9fbfe", minHeight: "100vh", paddingBottom: "80px", paddingTop: "100px" }}>
      <div className="container" style={{ maxWidth: "900px" }}>
        <div style={{ marginBottom: "20px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          <Link to="/" style={{ color: "var(--primary)" }}>Home</Link>
          {" / "}
          <Link to="/katalog" style={{ color: "var(--primary)" }}>Katalog</Link>
          {" / "}
          <span>{katalog.name}</span>
        </div>

        <div style={{ background: "white", borderRadius: "15px", overflow: "hidden", boxShadow: "var(--shadow-card)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
          <div style={{ background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px", minHeight: "350px" }}>
            <img
              src={katalog.image_url || katalog.image || '/Icon-001b.png'}
              alt={katalog.name}
              style={{ maxWidth: "100%", maxHeight: "350px", objectFit: "contain", borderRadius: "10px" }}
            />
          </div>
          <div style={{ padding: "40px 35px" }}>
            <span style={{ background: "var(--bg-light)", color: "var(--primary)", padding: "5px 15px", borderRadius: "50px", fontSize: "0.85rem", fontWeight: 600, display: "inline-block", marginBottom: "15px" }}>
              {katalog.category}
            </span>
            {katalog.is_bestseller && (
              <span style={{ background: "var(--secondary)", color: "#fff", padding: "5px 15px", borderRadius: "50px", fontSize: "0.85rem", fontWeight: 600, display: "inline-block", marginBottom: "15px", marginLeft: "8px" }}>
                ⭐ Best Seller
              </span>
            )}
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", color: "var(--primary-dark)", marginBottom: "20px", lineHeight: 1.3 }}>
              {katalog.name}
            </h1>
            {katalog.description && (
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "25px" }}>{katalog.description}</p>
            )}
            <a
              href="https://wa.me/6281385508611"
              className="btn btn-primary btn-lg"
              target="_blank"
              rel="noreferrer"
              style={{ borderRadius: "50px", display: "inline-flex", alignItems: "center", gap: "10px" }}
            >
              <i className="fab fa-whatsapp"></i> Pesan via WhatsApp
            </a>
            <Link to="/katalog" style={{ display: "block", marginTop: "15px", color: "var(--primary)", fontSize: "0.9rem" }}>
              <i className="fas fa-arrow-left" style={{ marginRight: "6px" }}></i> Kembali ke Katalog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
