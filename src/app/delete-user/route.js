import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const db = await mysql.createConnection({ 
      host: '127.0.0.1', 
      user: 'root', 
      password: '', 
      database: 'api' 
    });

    await db.execute('DELETE FROM users WHERE id = ?', [id]);
    await db.end();

    return NextResponse.json({ message: 'Deleted Successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}