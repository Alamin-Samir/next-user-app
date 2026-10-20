import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    const db = await mysql.createConnection({ 
      host: '127.0.0.1', 
      user: 'root', 
      password: '', 
      database: 'api' 
    });

    await db.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    await db.end();

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}