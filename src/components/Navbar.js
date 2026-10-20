import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ padding: '15px', background: '#333', color: '#fff', display: 'flex', gap: '20px' }}>
      <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home (Registration)</Link>
      <Link href="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Admin Panel</Link>
    </nav>
  );
}