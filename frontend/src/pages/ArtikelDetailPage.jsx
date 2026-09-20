import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../config/axios";

export default function ArtikelDetailPage() {
  const { slug } = useParams();
  const [artikel, setArtikel] = useState(null);
  const [komentars, setKomentars] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', content: '' });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    api.get('/artikel/' + slug).then(r => {
      setArtikel(r.data);
      setKomentars(r.data.komentars || []);
      document.title = r.data.title + " - BonekaKu";
    }).catch(() => {
      setArtikel(false);
    });
  }, [slug]);

  const submitComment = (e) => {
    e.preventDefault();
    api.post('/artikel/' + artikel.id + '/komentar', form).then(r => {
      setMsg({ type: 'success', text: 'Komentar berhasil dikirim!' });
      setKomentars([r.data, ...komentars]);
      setForm({ name: '', email: '', content: '' });
    }).catch(() => {
      setMsg({ type: 'error', text: 'Gagal mengirim komentar.' });
    });
  };

  const renderContent = (html) => {
    if (!html) return '';
    // Convert literal \n text (escaped) to real newlines first
    let cleaned = html
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // If it has real HTML tags, render safely as HTML
    if (/<(p|div|h[1-6]|strong|em|br|ul|ol|li|a|span)\b/i.test(cleaned)) {
      return <div className="artikel-body" dangerouslySetInnerHTML={{ __html: cleaned }} />;
    }

    // Plain text: split by double-newlines into paragraphs
    const paragraphs = cleaned.split(/\n\n+/).filter(p => p.trim());
    if (paragraphs.length === 0) return <div className="artikel-body"><p style={{ marginBottom: '15px', lineHeight: 1.85 }}>{cleaned}</p></div>;
    return (
      <div className="artikel-body">
        {paragraphs.map((para, i) => (
          <p key={i} style={{ marginBottom: '15px', lineHeight: 1.85 }}>
            {para.trim().split('\n').map((line, j) => (
              <span key={j}>{line}{j < para.trim().split('\n').length - 1 && <br />}</span>
            ))}
          </p>
        ))}
      </div>
    );
  };

  if (artikel === false) return (
    <div style={{textAlign:'center', padding:'150px 0'}}>
      <h2>Artikel tidak ditemukan</h2>
      <Link to="/artikel" className="btn btn-primary" style={{marginTop:'20px'}}>Kembali ke Artikel</Link>
    </div>
  );
  if (!artikel) return <div style={{textAlign:'center', padding:'150px 0', fontSize:'1.2rem'}}>Memuat artikel...</div>;

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", paddingBottom: "80px", paddingTop:"100px" }}>
      <div className="container" style={{ maxWidth: "900px" }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: "20px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          <Link to="/" style={{ color: "var(--primary)" }}>Home</Link>
          {" / "}
          <Link to="/artikel" style={{ color: "var(--primary)" }}>Artikel</Link>
          {" / "}
          <span>{artikel.title}</span>
        </div>

        <article style={{ background: "white", borderRadius: "15px", overflow: "hidden", boxShadow: "var(--shadow-card)", marginBottom: "40px" }}>
          {/* Hero Image */}
          {(artikel.image_url || artikel.image) ? (
            <div style={{ position: "relative", maxHeight: "500px", overflow: "hidden" }}>
              <img
                src={artikel.image_url || artikel.image}
                alt={artikel.title}
                style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "60px 30px 25px", background: "linear-gradient(transparent, rgba(0,0,0,0.85))", color: "white" }}>
                <h1 style={{ fontSize: "2rem", fontFamily: "var(--font-heading)", marginBottom: "12px", lineHeight: 1.3 }}>{artikel.title}</h1>
                <div style={{ display: "flex", gap: "20px", fontSize: "0.9rem", opacity: 0.9, flexWrap: "wrap" }}>
                  <span>
                    <i className="fas fa-user" style={{ marginRight: "6px" }}></i>
                    <Link to={`/author/${encodeURIComponent(artikel.author || "Admin Bonekaku")}`} style={{ color: "inherit", textDecoration: "underline" }}>
                      {artikel.author || "Admin Bonekaku"}
                    </Link>
                  </span>
                  <span><i className="fas fa-calendar-alt" style={{ marginRight: "6px" }}></i>{new Date(artikel.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ padding: "40px 30px 25px", background: "linear-gradient(135deg, #0a75bc, #085a92)", color: "white" }}>
              <h1 style={{ fontSize: "2rem", fontFamily: "var(--font-heading)", marginBottom: "12px", lineHeight: 1.3 }}>{artikel.title}</h1>
              <div style={{ display: "flex", gap: "20px", fontSize: "0.9rem", opacity: 0.9, flexWrap: "wrap" }}>
                <span>
                  <i className="fas fa-user" style={{ marginRight: "6px" }}></i>
                  <Link to={`/author/${encodeURIComponent(artikel.author || "Admin Bonekaku")}`} style={{ color: "inherit", textDecoration: "underline" }}>
                    {artikel.author || "Admin Bonekaku"}
                  </Link>
                </span>
                <span><i className="fas fa-calendar-alt" style={{ marginRight: "6px" }}></i>{new Date(artikel.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          )}

          {/* Content */}
          <div style={{ padding: "35px 30px", fontSize: "1.05rem", color: "var(--text-dark)", lineHeight: 1.85 }}>
            {renderContent(artikel.content)}
          </div>
        </article>

        {/* Komentar Section */}
        <div style={{ background: "white", borderRadius: "15px", padding: "35px 30px", boxShadow: "var(--shadow-card)" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.7rem", color: "var(--primary-dark)", marginBottom: "25px", paddingBottom: "15px", borderBottom: "2px solid #f1f5f9" }}>
            <i className="fas fa-comments" style={{ marginRight: "10px" }}></i>Komentar ({komentars.length})
          </h3>

          {/* List komentar */}
          <div style={{ marginBottom: "40px" }}>
            {komentars.map(k => (
              <div key={k.id} style={{ display: "flex", gap: "15px", marginBottom: "20px", padding: "20px", background: "#f8fafc", borderRadius: "12px" }}>
                <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "linear-gradient(135deg,var(--primary),var(--primary-dark))", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", fontWeight: "bold", flexShrink: 0 }}>
                  {k.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", flexWrap: "wrap", gap: "5px" }}>
                    <strong style={{ color: "var(--text-dark)" }}>{k.name}</strong>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{new Date(k.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                  <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.6 }}>{k.content}</p>
                </div>
              </div>
            ))}
            {komentars.length === 0 && <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>Belum ada komentar. Jadilah yang pertama!</p>}
          </div>

          {/* Form komentar */}
          <div>
            <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", marginBottom: "20px", color: "var(--primary-dark)" }}>Tinggalkan Komentar</h4>
            {msg && (
              <div style={{ padding: "14px 18px", borderRadius: "10px", marginBottom: "20px", background: msg.type === 'success' ? "#d4edda" : "#f8d7da", color: msg.type === 'success' ? "#155724" : "#721c24", fontWeight: 600 }}>
                <i className={`fas fa-${msg.type === 'success' ? 'check-circle' : 'exclamation-circle'}`} style={{ marginRight: "8px" }}></i>{msg.text}
              </div>
            )}
            <form onSubmit={submitComment}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--text-dark)" }}>Nama *</label>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "2px solid #e2e8f0", fontFamily: "var(--font-body)", fontSize: "0.95rem", boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "var(--primary)"}
                    onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--text-dark)" }}>Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "2px solid #e2e8f0", fontFamily: "var(--font-body)", fontSize: "0.95rem", boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "var(--primary)"}
                    onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: 600, color: "var(--text-dark)" }}>Komentar *</label>
                <textarea required rows="5" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
                  style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "2px solid #e2e8f0", fontFamily: "var(--font-body)", fontSize: "0.95rem", boxSizing: "border-box", resize: "vertical", outline: "none", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "var(--primary)"}
                  onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: "12px 30px", fontSize: "1rem", borderRadius: "50px", border: "none", cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 600 }}>
                <i className="fas fa-paper-plane" style={{ marginRight: "8px" }}></i>Kirim Komentar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
