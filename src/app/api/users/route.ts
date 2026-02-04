import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'users.json');

function readUsers() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

function writeUsers(users: any[]) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

// GET /api/users - Get all users
export async function GET() {
  const users = readUsers();
  return NextResponse.json(users);
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  const body = await request.json();
  const users = readUsers();

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u: any) => u.id)) + 1 : 1,
    name: body.name,
    email: body.email,
    role: body.role || 'viewer'
  };

  users.push(newUser);
  writeUsers(users);

  return NextResponse.json(newUser, { status: 201 });
}
