export default function Footer() {
  return (
    <>
      <footer className="footer" id="kontak">
        <div className="container footer-grid">
          <div className="footer-contact">
            <h4>Kunjungi dan Hubungi Kami</h4>
            <div className="contact-item">
              <i className="fas fa-building"></i>
              <div><strong>Office</strong><br />Jl. Katelia Raya Blok AS-3 No. 35, Jatisampurna, Kec. Jatisampurna, Kota Bks, Jawa Barat 17433</div>
            </div>
            <div className="contact-item">
              <i className="fas fa-tools"></i>
              <div><strong>Workshop</strong><br />Jln. Bogor-Bekasi No.61 Ciketing Udik, Bantar Gebang, Bekasi.</div>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone-alt"></i>
              <div><strong>Hot Line</strong><br />0813-8550-8611</div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div><strong>Email</strong><br />marketingbonekaku@gmail.com</div>
            </div>
            <div className="footer-social">
              <a href="https://youtube.com/@bonekakuid9160" target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="https://www.instagram.com/bonekaku_store" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://www.facebook.com/kajian.teori" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            </div>
          </div>
          <div className="footer-map">
            <iframe src="https://maps.google.com/maps?q=Jl.%20Katelia%20Raya%20Blok%20AS-3%20No.%2035,%20Jatisampurna,%20Bekasi&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{border:0,borderRadius:"12px",minHeight:"300px"}} allowFullScreen loading="lazy"></iframe>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2021 BONEKAKU.CO.ID All Right Reserved</p>
        </div>
      </footer>
      <a href="https://wa.me/6281385508611" className="wa-float" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}