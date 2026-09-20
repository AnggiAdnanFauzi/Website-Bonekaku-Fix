import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../config/axios";

export default function AuthorPage() {
  const { authorName } = useParams();
  const authorDecoded = decodeURIComponent(authorName || "Admin Bonekaku");
  const [artikels, setArtikels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = `Author: ${authorDecoded} - Bonekaku`;
    setLoading(true);
    api.get("/artikel")
      .then((res) => {
        const all = res.data.data || res.data || [];
        const filtered = all.filter((art) => {
          const artAuthor = art.author || "Admin Bonekaku";
          return artAuthor.toLowerCase() === authorDecoded.toLowerCase();
        });
        setArtikels(filtered);
      })
      .catch(() => setArtikels([]))
      .finally(() => setLoading(false));
  }, [authorDecoded]);

  return (
    <>
      <style>{`
        /* ===== AUTHOR ARCHIVE LAYOUT ===== */
        .author-section { padding: 40px 0 100px; background-color: #fff; min-height: 50vh; }
        .author-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 15px;
        }
        .author-header {
            padding-top: 140px;
            padding-bottom: 20px;
            background-color: #fff;
        }
        .author-header h1 {
            color: #0b3954;
            font-size: 2rem;
            margin: 0;
            font-family: var(--font-heading, 'Fredoka', sans-serif);
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
            position: relative;
        }
        .author-header h1::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -1px;
            width: 50px;
            height: 2px;
            background-color: #e62b4a;
        }
        
        .post-item {
            margin-bottom: 60px;
        }
        .post-thumb img {
            width: 100%;
            height: auto;
            max-height: 450px;
            object-fit: cover;
            border-radius: 12px;
            margin-bottom: 25px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.06);
            transition: transform 0.3s ease;
        }
        .post-thumb img:hover {
            transform: scale(1.01);
        }
        .post-title {
            font-size: 1.8rem;
            color: #0b3954;
            margin: 0 0 15px 0;
            font-family: var(--font-heading, 'Fredoka', sans-serif);
        }
        .post-title a {
            color: inherit;
            text-decoration: none;
            transition: color 0.3s;
        }
        .post-title a:hover {
            color: var(--primary, #0a75bc);
        }
        .post-meta {
            color: #888;
            font-size: 0.9rem;
            margin-bottom: 20px;
            display: flex;
            gap: 20px;
            align-items: center;
        }
        .post-meta i {
            margin-right: 6px;
        }
        .post-meta a {
            color: #888;
            text-decoration: none;
        }
        .post-meta a:hover {
            color: var(--primary, #0a75bc);
        }
        
        .post-excerpt {
            color: #666;
            font-size: 1rem;
            line-height: 1.8;
            margin-bottom: 20px;
        }
        .read-more-red {
            color: #e62b4a;
            font-weight: bold;
            text-decoration: none;
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 0.5px;
            margin-left: 6px;
        }
        .read-more-red:hover {
            text-decoration: underline;
        }
        
        .post-footer {
            border-top: 1px solid #eee;
            padding-top: 15px;
            color: #888;
            font-size: 0.85rem;
            display: flex;
            gap: 20px;
            text-transform: uppercase;
            font-weight: bold;
        }
        .post-footer i {
            margin-right: 6px;
        }
      `}</style>

      <section className="author-header">
        <div className="author-container">
          <h1>Author: {authorDecoded}</h1>
        </div>
      </section>

      <section className="author-section">
        <div className="author-container">
          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
              <i className="fas fa-spinner fa-spin fa-2x" style={{ color: "var(--primary, #0a75bc)" }}></i>
              <p style={{ marginTop: "15px" }}>Memuat artikel penulis...</p>
            </div>
          ) : artikels.length > 0 ? (
            artikels.map((artikel) => {
              let artImgSrc = "/Image-Boneka-Classic-Bear_.png";
              if (artikel.image_url) {
                artImgSrc = artikel.image_url;
              } else if (artikel.image) {
                if (artikel.image.startsWith("http") || artikel.image.startsWith("data:") || artikel.image.startsWith("../")) {
                  artImgSrc = artikel.image;
                } else if (artikel.image.startsWith("/uploads/")) {
                  artImgSrc = artikel.image;
                } else if (artikel.image.startsWith("artikel/")) {
                  artImgSrc = "/storage/" + artikel.image;
                } else {
                  artImgSrc = artikel.image.startsWith("/") ? artikel.image : "/" + artikel.image;
                }
              }

              const formattedDate = artikel.created_at || artikel.published_at
                ? new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(
                    new Date(artikel.created_at || artikel.published_at)
                  )
                : "-";

              const plainTextContent = artikel.content ? artikel.content.replace(/<[^>]+>/g, "") : "";
              const excerpt = plainTextContent.length > 250
                ? plainTextContent.substring(0, 250) + "..."
                : plainTextContent;

              const currAuthor = artikel.author || "Admin Bonekaku";

              return (
                <article key={artikel.id} className="post-item">
                  <div className="post-thumb">
                    <Link to={`/artikel/${artikel.slug}`}>
                      <img src={artImgSrc} alt={artikel.title} loading="lazy" />
                    </Link>
                  </div>

                  <h2 className="post-title">
                    <Link to={`/artikel/${artikel.slug}`}>{artikel.title}</Link>
                  </h2>

                  <div className="post-meta">
                    <span><i className="far fa-clock"></i> {formattedDate}</span>
                    <span><i className="fas fa-user"></i> <Link to={`/author/${encodeURIComponent(currAuthor)}`}>{currAuthor}</Link></span>
                  </div>

                  <p className="post-excerpt">
                    {excerpt}
                    <Link to={`/artikel/${artikel.slug}`} className="read-more-red">
                      READ MORE
                    </Link>
                  </p>

                  <div className="post-footer">
                    <span><i className="fas fa-folder"></i> ARTIKEL</span>
                    <span><i className="fas fa-comment"></i> Leave a comment</span>
                  </div>
                </article>
              );
            })
          ) : (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#888" }}>
              <i className="fas fa-newspaper fa-3x" style={{ color: "#ccc", marginBottom: "15px", display: "block" }}></i>
              Belum ada artikel yang ditulis oleh author <strong>{authorDecoded}</strong>.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
