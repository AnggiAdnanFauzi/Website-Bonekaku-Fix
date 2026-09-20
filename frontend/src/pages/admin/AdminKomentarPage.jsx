import { useEffect, useState } from 'react';
import api from '../../config/axios';

export default function AdminKomentarPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => {
    setLoading(true);
    try { const r = await api.get('/admin/komentar'); setItems(r.data.data || r.data); } catch{}
    setLoading(false);
  };
  useEffect(() => { load(); }, []);
  const handleDelete = async (id) => {
    if (!confirm('Hapus komentar ini?')) return;
    try { await api.delete('/admin/komentar/'+id); load(); } catch { alert('Gagal menghapus.'); }
  };
  return (
    <div>
      <div className='admin-header'><h1>Kelola Komentar</h1></div>
      <div className='admin-card'>
        <div className='admin-table-container'>
          {loading ? <div style={{textAlign:'center',padding:'40px',color:'#888'}}>Memuat...</div> : (
            <table className='admin-table'>
              <thead><tr>
                <th style={{width:'50px'}}>No</th>
                <th>Pengirim</th>
                <th>Komentar</th>
                <th>Di Artikel</th>
                <th>Tanggal</th>
                <th style={{width:'80px'}}>Aksi</th>
              </tr></thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx+1}</td>
                    <td><strong>{item.name}</strong><div style={{fontSize:'0.85rem',color:'#666'}}>{item.email}</div></td>
                    <td>{item.content}</td>
                    <td>{item.artikel ? <a href={'/artikel/'+item.artikel.slug} target='_blank' rel='noreferrer' style={{color:'#0a75bc',textDecoration:'underline'}}>{item.artikel.title}</a> : '-'}</td>
                    <td>{item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '-'}</td>
                    <td><button onClick={() => handleDelete(item.id)} className='btn-admin btn-admin-danger btn-admin-sm' title='Hapus'><i className='fas fa-trash'></i></button></td>
                  </tr>
                ))}
                {items.length === 0 && <tr><td colSpan={6} style={{textAlign:'center',padding:'30px',color:'#888'}}>Belum ada komentar</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
