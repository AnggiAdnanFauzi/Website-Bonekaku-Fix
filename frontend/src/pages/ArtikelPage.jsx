import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../config/axios";
import API_BASE from "../config/api";

export default function ArtikelPage() {
  const [artikelsData, setArtikelsData] = useState([]);

  useEffect(() => {
    document.title = "Artikel - BonekaKu";
    api.get("/artikel").then(r => setArtikelsData(r.data.data || r.data));
    
    const doReveal = () => {
      const reveals = document.querySelectorAll('.reveal-up');
      reveals.forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', doReveal, {passive: true});
    setTimeout(doReveal, 100);
    return () => window.removeEventListener('scroll', doReveal);
  }, []);

  return (
    <>
      
      <style dangerouslySetInnerHTML={{__html: `
        /* ===== ARTIKEL GRID ===== */
        .artikel-section { padding: 60px 0 100px; background-color: #f7f9fb; }
        .artikel-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
            gap: 30px;
        }
        .artikel-card {
            box-shadow: 0 4px 15px rgba(0,0,0,0.06);
            border-radius: 14px;
            overflow: hidden;
            background: #fff;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .artikel-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 14px 35px rgba(0,0,0,0.12);
        }
        .artikel-card .card-thumb {
            position: relative;
            overflow: hidden;
        }
        .artikel-card .card-thumb img {
            width: 100%;
            height: 220px;
            object-fit: cover;
            display: block;
            transition: transform 0.4s ease;
        }
        .artikel-card:hover .card-thumb img { transform: scale(1.05); }
        .artikel-card .card-body {
            padding: 22px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }
        .artikel-card .card-category {
            display: inline-block;
            background: rgba(10,117,188,0.1);
            color: var(--primary);
            padding: 3px 10px;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .artikel-card .card-title {
            font-family: var(--font-heading, 'Fredoka', sans-serif);
            font-size: 1.15rem;
            font-weight: 600;
            color: #222;
            margin: 0 0 10px;
            line-height: 1.4;
        }
        .artikel-card .card-excerpt {
            color: #666;
            font-size: 0.93rem;
            line-height: 1.65;
            flex-grow: 1;
            margin-bottom: 18px;
        }
        .artikel-card .card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: none;
            padding-top: 0;
            margin-bottom: 5px;
        }
        .artikel-card .card-meta {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .artikel-card .card-meta img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            object-fit: cover;
        }
        .artikel-card .meta-info { display: flex; flex-direction: column; }
        .artikel-card .meta-info .author { font-weight: 700; color: #333; font-size: 0.82rem; text-decoration: none; }
        .artikel-card .meta-info .author:hover { color: var(--primary); }
        .artikel-card .meta-info .date { color: #aaa; font-size: 0.78rem; }
                .artikel-card .read-more-text {
            display: block;
            margin-top: 8px;
            color: #6dbb5a; /* Green matching original */
            font-size: 0.85rem;
            font-weight: 700;
            text-decoration: none;
            transition: color 0.3s;
        }
        .artikel-card .read-more-text:hover { color: #5aa347; }
        .artikel-card .card-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: none;
            padding-top: 0;
            margin-bottom: 5px;
        }

        /* ===== MOBILE 2-COLUMN GRID FIX ===== */
        @media (max-width: 768px) {
            .artikel-grid {
                grid-template-columns: 1fr 1fr;
                gap: 12px;
            }
            .artikel-card .card-thumb img {
                height: 120px;
            }
            .artikel-card .card-body {
                padding: 12px;
            }
            .artikel-card .card-category {
                font-size: 0.65rem;
                padding: 2px 8px;
                margin-bottom: 6px;
            }
            .artikel-card .card-title {
                font-size: 0.95rem;
                margin-bottom: 6px;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .artikel-card .card-excerpt {
                font-size: 0.8rem;
                margin-bottom: 12px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .artikel-card .card-meta img {
                width: 24px;
                height: 24px;
            }
            .artikel-card .meta-info .author {
                font-size: 0.75rem;
            }
            .artikel-card .meta-info .date {
                font-size: 0.65rem;
                display: none;
            }
            .artikel-card .read-more-text {
                font-size: 0.75rem;
            }
        }
      `}} />

      <section className="special-section" style={{ paddingTop: "150px", paddingBottom: "80px", textAlign: "center", marginBottom: 0 }}>
        <div className="container reveal-up">
          <span className="section-badge" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", display: "inline-block", marginBottom: "15px", padding: "6px 16px", borderRadius: "50px", fontWeight: "700" }}>Informasi &amp; Edukasi</span>
          <h1 className="section-title-main" style={{ color: "#fff", fontSize: "3rem", margin: 0 }}>Artikel <span style={{ color: "var(--secondary)" }}>Bonekaku</span></h1>
          <p className="section-subtitle" style={{ color: "rgba(255,255,255,0.8)", maxWidth: "600px", margin: "15px auto 0", fontSize: "1.05rem" }}>Tips, inspirasi, dan berita seputar dunia boneka dan souvenir custom dari tim Bonekaku.</p>
        </div>
      </section>

      <section className="artikel-section reveal-up">
        <div className="container">
          <div className="artikel-grid">
            {artikelsData.map(artikel => {
              let artImgSrc = null;
              if (artikel.image_url || artikel.image) {
                const img = artikel.image_url || artikel.image;
                if (img.startsWith('http') || img.startsWith('data:')) {
                  artImgSrc = img;
                } else if (img.startsWith('artikel/')) {
                  artImgSrc = `${API_BASE}/storage/${img}`;
                } else {
                  artImgSrc = img.startsWith('/') ? img : '/' + img;
                }
              }

              const formattedDate = artikel.created_at 
                ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(artikel.created_at))
                : '-';
              
              const plainTextContent = artikel.content ? artikel.content.replace(/<[^>]+>/g, '') : '';
              const excerpt = plainTextContent.length > 120 
                ? plainTextContent.substring(0, 120) + '...' 
                : plainTextContent;

              const authorName = artikel.author || 'Admin Bonekaku';

              return (
                <div key={artikel.id} className="artikel-card">
                  <div className="card-thumb">
                    {artImgSrc ? (
                      <img src={artImgSrc} alt={artikel.title} loading="lazy" />
                    ) : (
                      <div style={{width:'100%', height:'220px', background:'#eef2f6', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#94a3b8'}}>
                        <i className="fas fa-image fa-3x" style={{marginBottom:'8px'}}></i>
                        <span style={{fontSize:'0.85rem', fontWeight:600}}>No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="card-body">
                      <span className="card-category">Artikel</span>
                      <h2 className="card-title">
                        <Link to={`/artikel/${artikel.slug}`} style={{ color: "inherit", textDecoration: "none" }}>{artikel.title}</Link>
                      </h2>
                      <p className="card-excerpt">
                          {excerpt}
                      </p>
                      <Link to={`/artikel/${artikel.slug}`} className="read-more-text" style={{ marginBottom: "16px", display: "inline-block" }}>
                          Read More
                      </Link>
                      <div className="card-footer">
                          <div className="card-meta">
                              <img src="https://secure.gravatar.com/avatar/e87a0d36c37fe3a69a91c686570ce0ab?s=96&d=mm&r=g" alt="Author" />
                              <div className="meta-info">
                                  <Link to={`/author/${encodeURIComponent(authorName)}`} className="author">{authorName}</Link>
                                  <span className="date">{formattedDate}</span>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              );
            })}
          </div>
          {artikelsData.length === 0 && (
            <div style={{ textAlign: "center", padding: "50px", color: "#888" }}>Belum ada artikel.</div>
          )}
        </div>
      </section>
      
      
    
    </>
  );
}
