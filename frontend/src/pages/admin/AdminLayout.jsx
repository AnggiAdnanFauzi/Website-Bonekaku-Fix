import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const ADMIN_CSS = '\n.admin-body{margin:0;font-family:Nunito,sans-serif;background-color:#f9fbfe;color:#333;display:flex;min-height:100vh}\n.sidebar{width:250px;background:#fff;box-shadow:2px 0 10px rgba(0,0,0,.05);padding:20px;display:flex;flex-direction:column;position:sticky;top:0;height:100vh;overflow-y:auto;flex-shrink:0}\n.sidebar .logo{font-family:Fredoka,sans-serif;font-size:1.5rem;color:#0a75bc;font-weight:700;margin-bottom:30px;text-align:center;display:block}\n.sidebar a{text-decoration:none;color:#555;padding:12px 15px;border-radius:8px;margin-bottom:5px;font-weight:600;display:flex;align-items:center;gap:10px;transition:all .3s}\n.sidebar a:hover,.sidebar a.active{background:#0a75bc;color:#fff}\n.admin-main{flex:1;padding:30px;overflow-y:auto;min-width:0;height:100vh;box-sizing:border-box}\n.admin-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;padding-bottom:15px;border-bottom:2px solid #eee}\n.admin-header h1{font-family:Fredoka,sans-serif;margin:0;color:#0a75bc;font-size:2rem}\n.btn-admin{padding:10px 20px;border-radius:8px;font-weight:700;text-decoration:none;cursor:pointer;border:none;display:inline-flex;align-items:center;gap:8px;font-family:Fredoka,sans-serif;transition:.3s;font-size:1rem}\n.btn-admin-primary{background:#0a75bc;color:#fff}.btn-admin-primary:hover{background:#085a92}\n.btn-admin-secondary{background:#fbb03b;color:#fff}.btn-admin-secondary:hover{background:#e09c28}\n.btn-admin-danger{background:#dc3545;color:#fff}.btn-admin-danger:hover{background:#bb2d3b}\n.btn-admin-sm{padding:6px 12px;font-size:.85rem}\n.admin-card{background:#fff;border-radius:15px;padding:20px;box-shadow:0 4px 15px rgba(0,0,0,.05);display:flex;flex-direction:column}\n.admin-table-container{max-height:calc(100vh - 220px);overflow-y:auto;overflow-x:auto;border-radius:8px;border:1px solid #eef2f6}\n.admin-table-container::-webkit-scrollbar{width:7px;height:7px}\n.admin-table-container::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}\n.admin-table-container::-webkit-scrollbar-thumb:hover{background:#94a3b8}\n.admin-table{width:100%;border-collapse:separate;border-spacing:0;margin-top:0}\n.admin-table th,.admin-table td{padding:14px 16px;text-align:left;border-bottom:1px solid #eee}\n.admin-table th{font-family:Fredoka,sans-serif;color:#0a75bc;background:#f0f7ff;position:sticky;top:0;z-index:5;border-bottom:2px solid #dbeafe;box-shadow:0 2px 4px rgba(0,0,0,.03)}\n.admin-table tbody tr{background:#fff;transition:background .15s}\n.admin-table tbody tr:hover{background:#f8fafc}\n.admin-table img{border-radius:8px;object-fit:cover}\n.admin-form-group{margin-bottom:20px}\n.admin-form-group label{display:block;font-weight:600;margin-bottom:8px;color:#444}\n.admin-form-control{width:100%;padding:12px;border:1px solid #ddd;border-radius:8px;font-family:Nunito,sans-serif;font-size:1rem;box-sizing:border-box}\n.admin-alert-success{background:#d4edda;color:#155724;padding:15px;border-radius:8px;margin-bottom:20px;font-weight:600}\n@media(max-width:768px){.admin-body{display:block}.sidebar{position:fixed;top:0;left:-280px;height:100vh;z-index:1000;transition:left .3s ease;width:250px}.sidebar.active{left:0}.admin-main{padding:15px;width:100%;box-sizing:border-box;height:auto}.admin-header{flex-direction:column;align-items:flex-start;gap:15px}.admin-table-container{max-height:70vh}}\n';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('bonekaku_token')) navigate('/login');
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem('bonekaku_token');
    localStorage.removeItem('bonekaku_user');
    navigate('/login');
  };
  const isActive = (p) => location.pathname.startsWith(p);
  return (
    <>
      <style>{ADMIN_CSS}</style>
      <div className='admin-body'>
        <div className={'sidebar ' + (isOpen ? 'active' : '')}>
          <div className='logo'>BONEKAKU Admin</div>
          <Link to='/admin/katalog' className={isActive('/admin/katalog') || location.pathname === '/admin' ? 'active' : ''} onClick={() => setIsOpen(false)}><i className='fas fa-box'></i> Data Katalog</Link>
          <Link to='/admin/artikel' className={isActive('/admin/artikel') ? 'active' : ''} onClick={() => setIsOpen(false)}><i className='fas fa-newspaper'></i> Data Artikel</Link>
          <Link to='/admin/komentar' className={isActive('/admin/komentar') ? 'active' : ''} onClick={() => setIsOpen(false)}><i className='fas fa-comments'></i> Kelola Komentar</Link>
          <div style={{marginTop:'auto',paddingTop:'15px',borderTop:'1px solid #eee'}}>
            <button onClick={handleLogout} style={{width:'100%',textAlign:'left',background:'transparent',border:'none',padding:'12px 15px',borderRadius:'8px',cursor:'pointer',color:'#dc3545',fontWeight:600,fontFamily:'Nunito,sans-serif',fontSize:'1rem',display:'flex',alignItems:'center',gap:'10px',transition:'all 0.3s'}} onMouseOver={e=>{e.currentTarget.style.background='#dc3545';e.currentTarget.style.color='#fff'}} onMouseOut={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='#dc3545'}}>
              <i className='fas fa-sign-out-alt'></i> Logout
            </button>
            <Link to='/' style={{color:'#fbb03b',padding:'12px 15px',display:'flex',gap:'10px',alignItems:'center',fontWeight:600,textDecoration:'none'}}><i className='fas fa-home'></i> Ke Halaman Depan</Link>
          </div>
        </div>
        <div className='admin-main'><Outlet /></div>
      </div>
    </>
  );
}
