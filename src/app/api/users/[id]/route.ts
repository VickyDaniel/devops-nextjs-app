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

// GET /api/users/[id] - Get user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const users = readUsers();
  const user = users.find((u: any) => u.id === parseInt(id));

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PUT /api/users/[id] - Update user by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const users = readUsers();
  const index = users.findIndex((u: any) => u.id === parseInt(id));

  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  users[index] = { ...users[index], ...body, id: parseInt(id) };
  writeUsers(users);

  return NextResponse.json(users[index]);
}

// DELETE /api/users/[id] - Delete user by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const users = readUsers();
  const index = users.findIndex((u: any) => u.id === parseInt(id));

  if (index === -1) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const deleted = users.splice(index, 1);
  writeUsers(users);

  return NextResponse.json(deleted[0]);
}
