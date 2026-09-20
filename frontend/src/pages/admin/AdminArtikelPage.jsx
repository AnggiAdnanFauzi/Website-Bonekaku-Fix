import { useEffect, useState } from 'react';
import api from '../../config/axios';

const getAdminName = () => {
  try {
    const u = JSON.parse(localStorage.getItem('bonekaku_user') || '{}');
    return u.name || 'Admin Bonekaku';
  } catch { return 'Admin Bonekaku'; }
};
const EMPTY = {title:'',content:'',author:'',published_at:''};

export default function AdminArtikelPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const load = async () => {
    setLoading(true);
    try { const r = await api.get('/artikel'); setItems(r.data.data || r.data); } catch{}
    setLoading(false);
  };
  useEffect(() => { load(); }, []);
  const openCreate = () => { setEditItem(null); setForm({...EMPTY, author: getAdminName()}); setImageFile(null); setShowForm(true); };
  const openEdit = (item) => { setEditItem(item); setForm({title:item.title,content:item.content||'',author:item.author||getAdminName(),published_at:item.published_at?item.published_at.substring(0,10):''}); setImageFile(null); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditItem(null); setMsg(null); };
  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setMsg(null);
    const fd = new FormData();
    Object.entries(form).forEach(([k,v]) => { if (k !== 'image' && v) fd.append(k, v); });
    if (imageFile) fd.append('image', imageFile);
    if (editItem) fd.append('_method', 'PUT');
    try {
      if (editItem) { await api.post('/admin/artikel/'+editItem.id, fd, {headers:{'Content-Type':'multipart/form-data'}}); }
      else { await api.post('/admin/artikel', fd, {headers:{'Content-Type':'multipart/form-data'}}); }
      setMsg({type:'success',text:editItem?'Artikel berhasil diperbarui!':'Artikel berhasil ditambahkan!'});
      load(); setTimeout(closeForm, 1200);
    } catch(err) { setMsg({type:'error',text:err.response?.data?.message||'Terjadi kesalahan.'}); }
    finally { setSaving(false); }
  };
  const handleDelete = async (id, title) => {
    if (!confirm('Hapus artikel: '+title+'?')) return;
    try { await api.delete('/admin/artikel/'+id); load(); } catch { alert('Gagal menghapus.'); }
  };
  return (
    <div>
      <div className='admin-header'>
        <h1>Data Artikel</h1>
        <button onClick={openCreate} className='btn-admin btn-admin-primary'><i className='fas fa-plus'></i> Tambah Artikel</button>
      </div>
      <div className='admin-card'>
        <div className='admin-table-container'>
          {loading ? <div style={{textAlign:'center',padding:'40px',color:'#888'}}>Memuat...</div> : (
            <table className='admin-table'>
              <thead><tr>
                <th style={{width:'50px'}}>No</th>
                <th style={{width:'100px'}}>Gambar</th>
                <th>Judul Artikel</th>
                <th>Penulis</th>
                <th>Tanggal Upload</th>
                <th style={{width:'100px'}}>Aksi</th>
              </tr></thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx+1}</td>
                    <td>{item.image_url ? <img src={item.image_url} alt={item.title} width='80' height='60' style={{objectFit:'cover'}} /> : <span style={{color:'#aaa'}}>No Image</span>}</td>
                    <td><strong>{item.title}</strong><div style={{fontSize:'0.85rem',color:'#666'}}>Slug: {item.slug}</div></td>
                    <td>{item.author || '-'}</td>
                    <td>{item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '-'}</td>
                    <td><div style={{display:'flex',gap:'8px'}}>
                      <button onClick={() => openEdit(item)} className='btn-admin btn-admin-secondary btn-admin-sm' title='Edit'><i className='fas fa-edit'></i></button>
                      <button onClick={() => handleDelete(item.id, item.title)} className='btn-admin btn-admin-danger btn-admin-sm' title='Hapus'><i className='fas fa-trash'></i></button>
                    </div></td>
                  </tr>
                ))}
                {items.length === 0 && <tr><td colSpan={6} style={{textAlign:'center',padding:'30px',color:'#888'}}>Belum ada data artikel</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showForm && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}} onClick={closeForm}>
          <div style={{background:'#fff',borderRadius:'15px',padding:'35px',width:'100%',maxWidth:'700px',maxHeight:'90vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
            <h2 style={{fontFamily:'Fredoka,sans-serif',fontSize:'1.5rem',color:'#0a75bc',marginBottom:'25px',marginTop:0}}>{editItem?'Edit Artikel':'Tambah Artikel'}</h2>
            {msg && <div style={{padding:'12px 15px',borderRadius:'8px',marginBottom:'15px',background:msg.type==='success'?'#d4edda':'#f8d7da',color:msg.type==='success'?'#155724':'#721c24',fontWeight:600}}>{msg.text}</div>}
            <form onSubmit={handleSave}>
              <div className='admin-form-group'>
                <label>Judul Artikel *</label>
                <input
                  required
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  className='admin-form-control'
                  placeholder='Masukkan judul artikel...'
                />
              </div>
              <div className='admin-form-group'>
                <label>Penulis</label>
                <input
                  value={form.author}
                  onChange={e => setForm({...form, author: e.target.value})}
                  className='admin-form-control'
                  placeholder='Nama Penulis (contoh: Admin Bonekaku)'
                  list='author-options'
                />
                <datalist id='author-options'>
                  <option value={getAdminName()} />
                  <option value='Admin Bonekaku' />
                  <option value='BonekaKu' />
                  <option value='Tim Promosi' />
                </datalist>
              </div>
              <div className='admin-form-group'><label>Konten Artikel *</label><textarea required value={form.content} onChange={e=>setForm({...form,content:e.target.value})} className='admin-form-control' rows={10} placeholder='Tulis konten artikel di sini...'></textarea></div>
              <div className='admin-form-group'>
                <label>Gambar Cover</label>
                {editItem?.image_url && !imageFile && <img src={editItem.image_url} alt='' style={{height:'60px',objectFit:'contain',borderRadius:'8px',border:'1px solid #ddd',marginBottom:'8px',display:'block'}} />}
                <input type='file' accept='image/*' onChange={e=>setImageFile(e.target.files[0])} className='admin-form-control' />
              </div>
              <div style={{marginTop:'20px',borderTop:'1px solid #eee',paddingTop:'20px',display:'flex',gap:'10px'}}>
                <button type='submit' disabled={saving} className='btn-admin btn-admin-primary'><i className='fas fa-save'></i> {saving?'Menyimpan...':'Simpan Artikel'}</button>
                <button type='button' onClick={closeForm} style={{padding:'10px 20px',borderRadius:'8px',border:'1px solid #ddd',background:'#fff',cursor:'pointer',fontFamily:'Nunito,sans-serif',fontWeight:600}}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
