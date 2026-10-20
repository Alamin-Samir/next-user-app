'use client';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/add-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    
    if (res.ok) {
      alert('সফলভাবে ইউজার যুক্ত হয়েছে!');
      setName('');
      setEmail('');
    } else {
      alert('সমস্যা হয়েছে!');
    }
  };

  return (
    <main style={{ padding: '30px' }}>
      <h1>ইউজার রেজিস্ট্রেশন ফর্ম</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px', marginTop: '15px' }}>
        <input 
          type="text" 
          placeholder="আপনার নাম" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="email" 
          placeholder="আপনার ইমেল" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', cursor: 'pointer' }}>জমা দিন</button>
      </form>
    </main>
  );
}