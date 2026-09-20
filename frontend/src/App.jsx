import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import KatalogPage from "./pages/KatalogPage";
import KatalogDetailPage from "./pages/KatalogDetailPage";
import LayananPage from "./pages/LayananPage";
import TentangKamiPage from "./pages/TentangKamiPage";
import KontakKamiPage from "./pages/KontakKamiPage";
import ArtikelPage from "./pages/ArtikelPage";
import ArtikelDetailPage from "./pages/ArtikelDetailPage";
import AuthorPage from "./pages/AuthorPage";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminKatalogPage from "./pages/admin/AdminKatalogPage";
import AdminArtikelPage from "./pages/admin/AdminArtikelPage";
import AdminKomentarPage from "./pages/admin/AdminKomentarPage";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <a href="https://wa.me/6281385508611" className="wa-float" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
    </>
  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem("bonekaku_token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/katalog" element={<PublicLayout><KatalogPage /></PublicLayout>} />
        <Route path="/katalog/:id" element={<PublicLayout><KatalogDetailPage /></PublicLayout>} />
        <Route path="/layanan" element={<PublicLayout><LayananPage /></PublicLayout>} />
        <Route path="/tentang-kami" element={<PublicLayout><TentangKamiPage /></PublicLayout>} />
        <Route path="/kontak-kami" element={<PublicLayout><KontakKamiPage /></PublicLayout>} />
        <Route path="/artikel" element={<PublicLayout><ArtikelPage /></PublicLayout>} />
        <Route path="/artikel/:slug" element={<PublicLayout><ArtikelDetailPage /></PublicLayout>} />
        <Route path="/author/:authorName" element={<PublicLayout><AuthorPage /></PublicLayout>} />
        
        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
          <Route index element={<Navigate to="/admin/katalog" replace />} />
          <Route path="katalog" element={<AdminKatalogPage />} />
          <Route path="artikel" element={<AdminArtikelPage />} />
          <Route path="komentar" element={<AdminKomentarPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
