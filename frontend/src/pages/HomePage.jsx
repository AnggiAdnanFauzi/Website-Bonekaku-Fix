import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../config/axios";
import NewProductsCoverflow from "../components/NewProductsCoverflow";
import SouvenirCarousel from "../components/SouvenirCarousel";
import Particles from "../components/Particles";

export default function HomePage() {
  const [mostFavorite, setMostFavorite] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [allKatalogs, setAllKatalogs] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    document.title = "BonekaKu - Pusat Souvenir dan Boneka Terlengkap";
    api.get("/katalog").then(r => {
      const all = r.data.data || r.data;
      setMostFavorite(all.filter(k => k.is_bestseller));
      setNewProducts([...all].reverse().slice(0, 8));
      setAllKatalogs(all);
    });
    const doReveal = () => {
      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight - 100) el.classList.add('active');
      });
    };
    window.addEventListener('scroll', doReveal, {passive:true});
    setTimeout(doReveal, 150);
    return () => window.removeEventListener('scroll', doReveal);
  }, []);

  const getCatClass = (cat, isBestseller) => {
    let c = "all";
    if (cat === "Animal Series" || cat === "New Animal Series") c = "animal";
    else if (cat === "Bantal Custom" || cat === "Bantal Desain") c = "bantal";
    else if (cat === "Boneka Souvenir" || cat === "Souvenir Desain") c = "souvenir";
    else if (cat === "Boneka Custom" || cat === "Boneka Desain") c = "custom";
    else if (cat === "Graduation Series") c = "graduation";
    else if (cat === "Maskot / Badut") c = "maskot";
    else if (cat === "Masker") c = "masker";
    if (isBestseller) c += " most-favorite";
    return c;
  };

  const getDisplayedCatalogs = () => {
    if (!allKatalogs.length) return [];
    if (activeFilter === "all") {
      const keys = ["animal", "bantal", "souvenir", "custom", "graduation", "maskot", "masker", "most-favorite"];
      let result = [];
      const usedIds = new Set();
      keys.forEach(key => {
        let itemsForThisKey = allKatalogs.filter(k => {
           if (key === "most-favorite") return k.is_bestseller;
           const catClass = getCatClass(k.category, k.is_bestseller);
           return catClass.includes(key);
        });
        let count = 0;
        for (let item of itemsForThisKey) {
           if (!usedIds.has(item.id)) {
              result.push(item);
              usedIds.add(item.id);
              count++;
           }
           if (count >= 2) break;
        }
      });
      return result;
    } else {
      let items = allKatalogs.filter(k => {
         if (activeFilter === "most-favorite") return k.is_bestseller;
         const catClass = getCatClass(k.category, k.is_bestseller);
         return catClass.includes(activeFilter);
      });
      return items.slice(0, 4);
    }
  };

  const getImgSrc = (img) => {
    if (!img) return "/Icon-001b.png";
    if (img.startsWith("http") || img.startsWith("data:") || img.startsWith("/")) return img;
    return "/" + img;
  };

  const customers = ["Indofood","Astra-Daihatsu","Ibis-Hotel","Rumah-Sakit-Siloam","Rumah-Sakit-Haji","BNI","Telkomsel","Mandiri","Dipostar","Toyota"];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" id="home" style={{position:"relative"}}>
        <Particles />
        <div className="container hero-container" style={{position:"relative", zIndex:2}}>
          <div className="hero-content reveal-left">
            <h2 className="pre-title">bonekaku</h2>
            <h1 className="title">Proses Cepat<br /><span className="highlight">Bisa Custom</span><br />Kami jagonya</h1>
            <p className="description">Di <strong>BONEKAKU.CO.ID</strong> kebutuhan souvenir anda dapat kami wujudkan dalam bentuk boneka, bantal, tas, maskot ataupun badut.</p>
            <div className="hero-actions">
              <a href="https://wa.me/6281385508611" className="btn btn-primary btn-lg" target="_blank" rel="noreferrer">Kontak Kami <i className="fas fa-angle-right"></i></a>
            </div>
          </div>
          <div className="hero-visual reveal-right">
            <div className="visual-card primary-card"><img src="/Icon-001b.png" alt="Boneka" /></div>
            <div className="visual-card secondary-card"><img src="/Icon-002b.png" alt="Bantal" /></div>
            <div className="visual-card accent-card"><img src="/Icon-004b.png" alt="Maskot" /></div>
            <div className="visual-card extra-card"><img src="/Icon-003b.png" alt="Boneka Custom" /></div>
          </div>
        </div>
      </section>

      {/* ===== INTRO ===== */}
      <section className="intro-section">
        <div className="container">
          <div className="intro-box reveal-up">
            <p>Anda sudah benar. Boneka-boneka lucu, boneka custom, bantal karakter, bantal custom dapat menjadi pilihan souvenir yang cocok untuk promosi.</p>
            <p>Kami memiliki aneka pilihan model dan desain yang dapat menghiasi momen spesial anda seperti untuk promo produk, acara perusahaan, wedding, ulang tahun, baby shower, wisuda dan lain-lain. Anda dapat memesan boneka atau bantal custom dengan berbagai ukuran, beragam pilihan bahan berkualitas dan isian kapas terbaik sehingga terjaga kualitas bentuknya serta aman digunakan oleh semua usia.</p>
          </div>
        </div>
      </section>

      {/* ===== HOOK ===== */}
      <section className="hook-section">
        <div className="container hook-container">
          <h2>Ingin membuat souvenir yang unik?</h2>
          <h3>Souvenir yang mewakili produk/ perusahaan anda dihadapan konsumen?</h3>
          <h3 className="highlight-text">...dan yang disukai banyak orang?</h3>
        </div>
      </section>

      {/* ===== SERVICES / LAYANAN ===== */}
      <section className="services" id="layanan">
        <div className="container">
          <div className="jagoan-badge-wrap">
            <div className="jagoan-hero">
              <img src="/Logo-Baru-Bonekaku-1030x279.png" alt="Logo Bonekaku" className="jagoan-logo" />
              <div className="jagoan-title">
                <span className="jagoan-line1">JAGONYA</span>
                <span className="jagoan-line2">BUAT BONEKA</span>
                <div className="jagoan-underline"></div>
              </div>
            </div>
          </div>
          <div className="bento-grid">
            <div className="bento-card reveal-up"><div className="icon-wrapper"><img src="/Icon-001b.png" alt="Boneka" /></div><h3>Boneka Souvenir</h3><p>boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.</p></div>
            <div className="bento-card reveal-up" style={{transitionDelay:"0.1s"}}><div className="icon-wrapper"><img src="/Icon-002b.png" alt="Bantal" /></div><h3>Bantal Custom</h3><p>Bantal juga dapat dijadikan media promosi yang menarik dan efektif. kami menyediakan dan alternatif desain bantal yang dapat anda pilih.</p></div>
            <div className="bento-card reveal-up" style={{transitionDelay:"0.2s"}}><div className="icon-wrapper"><img src="/Icon-003b.png" alt="Boneka Custom" /></div><h3>Boneka Custom</h3><p>Punya mascot andalan? Bingung menjadikannya menarik tidak hanya sebuah logo? Bawa pada kami, dan kami akan bantu untuk wujudkan dalam bentuk boneka.</p></div>
            <div className="bento-card reveal-up" style={{transitionDelay:"0.3s"}}><div className="icon-wrapper"><img src="/Icon-004b.png" alt="Maskot" /></div><h3>Maskot / Badut</h3><p>Kami juga menerima pemesanan maskot / badut untuk media promosi. Dengan bahan dan rangka yang kokoh</p></div>
          </div>
        </div>
      </section>

      {/* ===== SPECIAL PRODUCT ===== */}
      <section className="special-section" id="special-product">
        <div className="container">
          <div className="section-header">
            <span className="section-badge badge-special">Limited Edition</span>
            <h2 className="section-title-main">SPECIAL <span className="highlight">PRODUCT</span></h2>
            <p className="section-subtitle">Produk spesial eksklusif yang hanya ada di Bonekaku</p>
          </div>
          <div className="special-container">
            <div className="special-product-card">
              <div className="sp-badge-wrap">
                <span className="sp-label"><i className="fas fa-star"></i> SPECIAL</span>
              </div>
              <div className="sp-img">
                <img src="/Icon-002b.png" alt="Bean Bag Bonekaku" />
              </div>
              <h3>Bean Bag Bonekaku</h3>
              <p>Tempat duduk santai berbentuk kacang-kacangan berisi butiran styrofoam lembut. Nyaman sebagai kursi malas sekaligus bantal. Tersedia dalam berbagai ukuran dan bahan pilihan.</p>
              <ul className="sp-features">
                <li><i className="fas fa-check-circle"></i> Bahan Polyster Balon Waterproof</li>
                <li><i className="fas fa-check-circle"></i> Bahan Katun Waterproof (permukaan halus)</li>
                <li><i className="fas fa-check-circle"></i> Bahan Synthetic Leather Tebal &amp; Waterproof</li>
                <li><i className="fas fa-check-circle"></i> Ukuran 75x125 cm &amp; 90x135 cm</li>
              </ul>
              <a href="https://wa.me/6281385508611" className="btn btn-primary" target="_blank" rel="noreferrer">Order Sekarang <i className="fas fa-angle-right"></i></a>
            </div>
            <div className="special-video-wrap">
              <div className="video-label"><i className="fab fa-youtube"></i> Tonton Video Kami</div>
              <div className="video-frame">
                <iframe
                  src="https://www.youtube.com/embed/2bfaB0CAz4I"
                  title="Bonekaku - Bean Bag &amp; Produk Spesial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="video-sub">Lihat koleksi Bean Bag dan produk terbaru Bonekaku di YouTube kami</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEW PRODUCTS ===== */}
      <section className="new-products-section" style={{padding:"120px 0 100px 0", background:"linear-gradient(135deg, #f8fafc, #eff6ff)", overflow:"hidden"}}>
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-badge" style={{background:"linear-gradient(135deg, #00b09b, #96c93d)"}}>Koleksi Baru</span>
            <h2 className="section-title-main">New <span className="highlight">Product</span></h2>
            <p className="section-subtitle">Koleksi boneka dan souvenir terbaru dengan desain eksklusif</p>
          </div>
          <div className="reveal-up" style={{transitionDelay:"0.2s"}}>
            <NewProductsCoverflow items={newProducts} />
          </div>
        </div>
      </section>

      {/* ===== MOST FAVORITE + PRODUCT CATALOG ===== */}
      <section className="most-favorite-section" id="most-favorite" style={{padding:"120px 0"}}>
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-badge">Best Seller</span>
            <h2 className="section-title-main">Souvenir <span className="highlight">Most Favorite</span></h2>
            <p className="section-subtitle">Produk souvenir terpopuler pilihan pelanggan setia Bonekaku</p>
          </div>
          <SouvenirCarousel items={mostFavorite} />

          <hr style={{margin:"80px auto 100px auto", width:"80%", border:"none", borderTop:"2px dashed #e2e8f0"}} />

          <div className="section-header reveal-up">
            <span className="section-badge">Koleksi Lengkap</span>
            <h2 className="section-title-main">Product <span className="highlight">Catalog</span></h2>
            <p className="section-subtitle">Temukan berbagai pilihan koleksi boneka, bantal, dan souvenir menarik kami</p>
          </div>
          <div className="katalog-filters">
            {[
              { id: 'all', label: 'All' },
              { id: 'most-favorite', label: 'Most Favorite' },
              { id: 'animal', label: 'Animal Series' },
              { id: 'bantal', label: 'Bantal Custom' },
              { id: 'souvenir', label: 'Boneka Souvenir' },
              { id: 'custom', label: 'Boneka Custom' },
              { id: 'graduation', label: 'Graduation Series' },
              { id: 'maskot', label: 'Maskot' },
              { id: 'masker', label: 'Masker' },
            ].map(btn => (
              <button 
                key={btn.id}
                className={`kfilter-btn ${activeFilter === btn.id ? 'active' : ''}`} 
                onClick={() => setActiveFilter(btn.id)}
              >
                {btn.label}
              </button>
            ))}
          </div>
          <div className="katalog-grid">
            {getDisplayedCatalogs().map((katalog) => (
              <div key={katalog.id} className={"katalog-item " + getCatClass(katalog.category, katalog.is_bestseller)}>
                <div className="kitem-img"><img src={getImgSrc(katalog.image_url || katalog.image)} alt={katalog.name} loading="lazy" /></div>
              </div>
            ))}
          </div>
          <div className="katalog-more" style={{textAlign:"center",marginTop:"20px"}}>
            <Link to="/katalog" className="btn btn-primary btn-lg">Lihat Semua Produk <i className="fas fa-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      {/* ===== PROSES PEMESANAN ===== */}
      <section className="proses-section" id="proses-pemesanan">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-badge">Mudah &amp; Cepat</span>
            <h2 className="section-title-main">Proses <span className="highlight">Pemesanan</span></h2>
            <p className="section-subtitle">Pahami panduan 3 langkah mudah berikut sebelum Anda memesan</p>
          </div>
          <div className="proses-timeline">
            <div className="proses-step reveal-up" style={{transitionDelay:"0s"}}>
              <div className="proses-icon"><i className="fas fa-shopping-cart"></i></div>
              <div className="proses-num">01</div>
              <h4><a href="https://bonekaku.co.id/" style={{color:"inherit",textDecoration:"none"}}>PEMESANAN</a></h4>
              <p>Untuk pemesanan boneka, ada minimum order yang harus dipenuhi. Untuk boneka yang sudah pernah kami buat, minimum order 100pcs. Untuk boneka desain baru, minimum order 200pcs. Untuk boneka ukuran kecil (baik desain lama atau baru), minimum order 500pcs. Untuk pembeli boneka grosir, boleh minimum 3pcs.</p>
            </div>
            <div className="proses-arrow" style={{transitionDelay:"0.1s"}}><i className="fas fa-arrow-right"></i></div>
            <div className="proses-step reveal-up" style={{transitionDelay:"0.15s"}}>
              <div className="proses-icon"><i className="fas fa-cogs"></i></div>
              <div className="proses-num">02</div>
              <h4><a href="https://bonekaku.co.id/" style={{color:"inherit",textDecoration:"none"}}>PEMBUATAN</a></h4>
              <p>Boneka yang kami buat adalah boneka dari bahan kain. <a href="https://bonekaku.co.id/2020/07/20/kain-boneka-terbaik-untuk-di-produksi-masal/" style={{color:"var(--primary)",fontWeight:"bold"}}>Contoh-contoh bahan/kain boneka.</a> Membuat boneka didahului dengan membuat sampel boneka. Tidak semua desain gambar bisa dibuat menjadi boneka karena ada keterbatasan pola kain, sehingga bentuk tertentu perlu disederhanakan. Warna bahan boneka juga tertentu, sehingga warna logo perusahaan harus menyesuaikan.</p>
            </div>
            <div className="proses-arrow" style={{transitionDelay:"0.25s"}}><i className="fas fa-arrow-right"></i></div>
            <div className="proses-step reveal-up" style={{transitionDelay:"0.3s"}}>
              <div className="proses-icon"><i className="fas fa-pencil-ruler"></i></div>
              <div className="proses-num">03</div>
              <h4><a href="https://bonekaku.co.id/" style={{color:"inherit",textDecoration:"none"}}>ORDER CUSTOM</a></h4>
              <p>Jika Anda punya desain sendiri, silahkan mengirim email yang ada di kontak web kami untuk berdiskusi lebih lanjut.</p>
            </div>
          </div>
          <div className="proses-cta">
            <a href="https://wa.me/6281385508611" className="btn btn-primary btn-lg" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i> Mulai Pesan Sekarang</a>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      <section className="testimoni-section" id="testimoni">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-badge badge-special">Ulasan Nyata</span>
            <h2 className="section-title-main">Yang <span className="highlight">Dikatakan</span> Mereka</h2>
            <p className="section-subtitle">Kepuasan pelanggan adalah prioritas utama kami</p>
          </div>
          <div className="testi-grid">
            <div className="testi-card reveal-up" style={{transitionDelay:"0s"}}>
              <div className="testi-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
              <p className="testi-text">"Bantalnya benar empuk lembut kainnya, gemesin, jahitan rapi dan kuat..rekomended..."</p>
              <div className="testi-author">
                <div className="testi-avatar"><img src="/hud-hud-tours.jpg" alt="Hud Hud Tours" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}} /></div>
                <div><strong>Hud Hud Tours</strong><span>Travel Agent</span></div>
              </div>
            </div>
            <div className="testi-card reveal-up" style={{transitionDelay:"0.1s"}}>
              <div className="testi-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
              <p className="testi-text">"barangnya lucu-lucu banget!! udah gitu kualitasnya bagus dan proses produksinya cepet banget !! sukaaaa"</p>
              <div className="testi-author">
                <div className="testi-avatar"><img src="/unnamed.png" alt="Daniel Julian" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}} /></div>
                <div><strong>Daniel Julian</strong><span>Pengusaha</span></div>
              </div>
            </div>
            <div className="testi-card reveal-up" style={{transitionDelay:"0.2s"}}>
              <div className="testi-stars"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
              <p className="testi-text">"Material bahannya bagus, lembut, dan aman buat anak-anak, lucu-lucu bentuknya"</p>
              <div className="testi-author">
                <div className="testi-avatar"><img src="/unnamed-1.png" alt="Mamat Arohman" style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"}} /></div>
                <div><strong>Mamat Arohman</strong><span>Pengusaha</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CUSTOMER KAMI ===== */}
      <section className="customer-section" id="customer-kami">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-badge">Dipercaya</span>
            <h2 className="section-title-main">CUSTOMER <span className="highlight">KAMI</span></h2>
            <p className="section-subtitle">Kami telah melayani berbagai perusahaan dan instansi terkemuka di Indonesia</p>
          </div>
          <div className="customer-logos-container">
            <div className="customer-logos">
              {[...customers, ...customers].map((logo, i) => (
                <div key={i} className="cust-logo-item">
                  <img src={"/" + logo + ".png"} alt={logo.replace(/-/g," ")} style={{maxWidth:"120px",height:"auto"}} />
                </div>
              ))}
            </div>
          </div>
          <div className="customer-cta">
            <p>Bergabunglah bersama ribuan pelanggan puas Bonekaku!</p>
            <a href="https://wa.me/6281385508611" className="btn btn-primary btn-lg" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i> Hubungi Kami Sekarang</a>
          </div>
        </div>
      </section>
    </>
  );
}
