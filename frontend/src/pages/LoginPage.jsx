import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/axios";

export default function LoginPage() {
  const [form, setForm] = useState({ email:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login Admin - Bonekaku";
    if (localStorage.getItem("bonekaku_token")) navigate("/admin/katalog");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("bonekaku_token", res.data.token);
      localStorage.setItem("bonekaku_user", JSON.stringify(res.data.user));
      navigate("/admin/katalog");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal. Periksa email dan password Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#e0f0fa,#c8e2f4)",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{background:"#fff",borderRadius:"20px",padding:"50px 40px",width:"100%",maxWidth:"420px",boxShadow:"0 20px 60px rgba(10,117,188,0.2)"}}>
        <div style={{textAlign:"center",marginBottom:"35px"}}>
          <img src="/Logo-Baru-Bonekaku-1030x279.png" alt="Logo Bonekaku" style={{height:"50px",width:"auto",marginBottom:"20px"}} />
          <h1 style={{fontFamily:"var(--font-heading)",fontSize:"1.8rem",color:"var(--primary-dark)",marginBottom:"8px"}}>Admin Panel</h1>
          <p style={{color:"var(--text-muted)",fontSize:"0.95rem"}}>Masuk untuk mengelola konten website</p>
        </div>

        {error && (
          <div style={{padding:"12px 16px",background:"#fee2e2",color:"#991b1b",borderRadius:"10px",marginBottom:"20px",fontSize:"0.9rem",border:"1px solid #fecaca"}}>
            <i className="fas fa-exclamation-circle" style={{marginRight:"8px"}}></i>{error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{display:"grid",gap:"16px"}}>
          <div>
            <label style={{display:"block",fontSize:"0.9rem",fontWeight:600,color:"var(--text-dark)",marginBottom:"6px"}}>Email</label>
            <input
              type="email" required value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              placeholder="admin@bonekaku.id"
              style={{width:"100%",padding:"12px 16px",border:"2px solid #e2e8f0",borderRadius:"10px",fontFamily:"var(--font-body)",fontSize:"1rem",outline:"none",transition:"border-color 0.2s"}}
              onFocus={e => e.target.style.borderColor="var(--primary)"}
              onBlur={e => e.target.style.borderColor="#e2e8f0"}
            />
          </div>
          <div>
            <label style={{display:"block",fontSize:"0.9rem",fontWeight:600,color:"var(--text-dark)",marginBottom:"6px"}}>Password</label>
            <input
              type="password" required value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              placeholder=""
              style={{width:"100%",padding:"12px 16px",border:"2px solid #e2e8f0",borderRadius:"10px",fontFamily:"var(--font-body)",fontSize:"1rem",outline:"none",transition:"border-color 0.2s"}}
              onFocus={e => e.target.style.borderColor="var(--primary)"}
              onBlur={e => e.target.style.borderColor="#e2e8f0"}
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="btn btn-primary"
            style={{padding:"14px",borderRadius:"50px",border:"none",cursor:loading?"not-allowed":"pointer",opacity:loading?0.7:1,fontSize:"1rem",fontWeight:600,marginTop:"8px"}}
          >
            {loading ? <><i className="fas fa-spinner fa-spin"></i> Masuk...</> : <><i className="fas fa-sign-in-alt"></i> Masuk</>}
          </button>
        </form>

        <div style={{textAlign:"center",marginTop:"25px"}}>
          <a href="/" style={{color:"var(--primary)",fontSize:"0.9rem",fontWeight:600}}><i className="fas fa-arrow-left" style={{marginRight:"6px"}}></i>Kembali ke Website</a>
        </div>
      </div>
    </div>
  );
}
