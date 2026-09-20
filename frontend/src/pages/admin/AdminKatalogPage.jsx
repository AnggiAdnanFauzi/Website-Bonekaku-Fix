import { useEffect, useState } from 'react';
import api from '../../config/axios';

const CATS = ['Boneka','Bantal','Beanbag','Kostum & Maskot','Selimut','Baju','Kasur','Bando','Masker','Animal Series','Graduation Series','Bantal Custom'];
const EMPTY = {name:'',category:'',price:'',description:'',is_bestseller:false};

export default function AdminKatalogPage() {
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
    try { const r = await api.get('/katalog'); setItems(r.data.data || r.data); } catch{}
    setLoading(false);
  };
  useEffect(() => { load(); }, []);
  const openCreate = () => { setEditItem(null); setForm(EMPTY); setImageFile(null); setShowForm(true); };
  const openEdit = (item) => { setEditItem(item); setForm({name:item.name,category:item.category||'',price:item.price||'',description:item.description||'',is_bestseller:!!item.is_bestseller}); setImageFile(null); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditItem(null); setMsg(null); };
  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true); setMsg(null);
    const fd = new FormData();
    Object.entries(form).forEach(([k,v]) => fd.append(k, v));
    if (imageFile) fd.append('image', imageFile);
    if (editItem) fd.append('_method', 'PUT');
    try {
      if (editItem) { await api.post('/admin/katalog/'+editItem.id, fd, {headers:{'Content-Type':'multipart/form-data'}}); }
      else { await api.post('/admin/katalog', fd, {headers:{'Content-Type':'multipart/form-data'}}); }
      setMsg({type:'success',text:editItem?'Produk berhasil diperbarui!':'Produk berhasil ditambahkan!'});
      load(); setTimeout(closeForm, 1200);
    } catch(err) { setMsg({type:'error',text:err.response?.data?.message||'Terjadi kesalahan.'}); }
    finally { setSaving(false); }
  };
  const handleDelete = async (id, name) => {
    if (!confirm('Hapus produk: '+name+'?')) return;
    try { await api.delete('/admin/katalog/'+id); load(); } catch { alert('Gagal menghapus.'); }
  };
  return (
    <div>
      <div className='admin-header'>
        <h1>Data Katalog</h1>
        <button onClick={openCreate} className='btn-admin btn-admin-primary'><i className='fas fa-plus'></i> Tambah Katalog</button>
      </div>
      <div className='admin-card'>
        <div className='admin-table-container'>
          {loading ? <div style={{textAlign:'center',padding:'40px',color:'#888'}}>Memuat...</div> : (
            <table className='admin-table'>
              <thead><tr>
                <th style={{width:'50px'}}>No</th>
                <th style={{width:'80px'}}>Gambar</th>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Status</th>
                <th style={{width:'160px'}}>Aksi</th>
              </tr></thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx+1}</td>
                    <td>{item.image_url ? <img src={item.image_url} alt={item.name} style={{width:'45px',height:'45px',objectFit:'cover',borderRadius:'6px',boxShadow:'0 2px 4px rgba(0,0,0,0.1)'}} /> : <span style={{color:'#aaa'}}>No Image</span>}</td>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.category || '-'}</td>
                    <td>{item.price || '-'}</td>
                    <td>{item.is_bestseller ? <span style={{background:'#fbb03b',color:'#fff',padding:'4px 10px',borderRadius:'12px',fontSize:'0.8rem',fontWeight:'bold'}}>Bestseller</span> : '-'}</td>
                    <td><div style={{display:'flex',gap:'8px'}}>
                      <button onClick={() => openEdit(item)} className='btn-admin btn-admin-secondary btn-admin-sm'><i className='fas fa-edit'></i> Edit</button>
                      <button onClick={() => handleDelete(item.id, item.name)} className='btn-admin btn-admin-danger btn-admin-sm'><i className='fas fa-trash'></i> Hapus</button>
                    </div></td>
                  </tr>
                ))}
                {items.length === 0 && <tr><td colSpan={7} style={{textAlign:'center',padding:'30px',color:'#888'}}>Belum ada data produk</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showForm && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center',padding:'20px'}} onClick={closeForm}>
          <div style={{background:'#fff',borderRadius:'15px',padding:'35px',width:'100%',maxWidth:'600px',maxHeight:'90vh',overflowY:'auto'}} onClick={e=>e.stopPropagation()}>
            <h2 style={{fontFamily:'Fredoka,sans-serif',fontSize:'1.5rem',color:'#0a75bc',marginBottom:'25px',marginTop:0}}>{editItem?'Edit Produk Katalog':'Tambah Produk Katalog'}</h2>
            {msg && <div style={{padding:'12px 15px',borderRadius:'8px',marginBottom:'15px',background:msg.type==='success'?'#d4edda':'#f8d7da',color:msg.type==='success'?'#155724':'#721c24',fontWeight:600}}>{msg.text}</div>}
            <form onSubmit={handleSave}>
              <div className='admin-form-group'><label>Nama Produk *</label><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className='admin-form-control' placeholder='Contoh: Boneka Beruang Besar' /></div>
              <div className='admin-form-group'><label>Kategori</label><select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className='admin-form-control'><option value=''>-- Pilih Kategori --</option>{CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
              <div className='admin-form-group'><label>Harga</label><input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className='admin-form-control' placeholder='Contoh: Rp 150.000' /></div>
              <div className='admin-form-group'><label>Deskripsi</label><textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className='admin-form-control' rows={4} placeholder='Deskripsi produk...'></textarea></div>
              <div className='admin-form-group' style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <input type='checkbox' id='bestseller' checked={!!form.is_bestseller} onChange={e=>setForm({...form,is_bestseller:e.target.checked})} style={{width:'20px',height:'20px'}} />
                <label htmlFor='bestseller' style={{margin:0}}>Tandai sebagai Bestseller (Tampil di Halaman Utama)</label>
              </div>
              <div className='admin-form-group'>
                <label>Gambar Produk</label>
                {editItem?.image_url && !imageFile && <img src={editItem.image_url} alt='' style={{height:'60px',objectFit:'contain',borderRadius:'8px',border:'1px solid #ddd',marginBottom:'8px',display:'block'}} />}
                <input type='file' accept='image/*' onChange={e=>setImageFile(e.target.files[0])} className='admin-form-control' />
                <small style={{color:'#888',display:'block',marginTop:'5px'}}>Biarkan kosong jika tidak ingin mengupload gambar.</small>
              </div>
              <div style={{marginTop:'20px',borderTop:'1px solid #eee',paddingTop:'20px',display:'flex',gap:'10px'}}>
                <button type='submit' disabled={saving} className='btn-admin btn-admin-primary'><i className='fas fa-save'></i> {saving?'Menyimpan...':'Simpan Produk'}</button>
                <button type='button' onClick={closeForm} style={{padding:'10px 20px',borderRadius:'8px',border:'1px solid #ddd',background:'#fff',cursor:'pointer',fontFamily:'Nunito,sans-serif',fontWeight:600}}>Batal</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
