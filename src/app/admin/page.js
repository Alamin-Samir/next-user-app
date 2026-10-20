'use client';
import { useState } from 'react';

export default function Admin() {
  const [pass, setPass] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [users, setUsers] = useState([]);

  const login = async (e) => {
    e.preventDefault();
    if (pass === '123') {
      setIsLogin(true);
      fetchUsers();
    } else {
      alert('ভুল পাসওয়ার্ড!');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/get-users');
      const text = await res.text();
      if (!text) return;
      const data = JSON.parse(text);
      if (data && data.data) {
        setUsers(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('আপনি কি এই ইউজারকে ডিলিট করতে চান?')) {
      const res = await fetch(`/api/delete-user?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchUsers();
      } else {
        alert('ডিলিট করতে সমস্যা হয়েছে!');
      }
    }
  };

  if (!isLogin) {
    return (
      <form onSubmit={login} style={{ padding: '30px' }}>
        <h2>অ্যাডমিন লগইন</h2>
        <input 
          type="password" 
          placeholder="পাসওয়ার্ড দিন (123)" 
          onChange={(e) => setPass(e.target.value)} 
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px', cursor: 'pointer' }}>লগইন</button>
      </form>
    );
  }

  return (
    <div style={{ padding: '30px' }}>
      <h2>ইউজার তালিকা ও অ্যাডমিন প্যানেল</h2>
      <ul style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {users && users.map(u => (
          <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '450px', background: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}>
            <span style={{ color: '#000000', fontWeight: '500' }}>{u.name} — ({u.email})</span>
            <button 
              onClick={() => handleDelete(u.id)} 
              style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}