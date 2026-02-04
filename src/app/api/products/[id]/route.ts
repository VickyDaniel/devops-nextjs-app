import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'products.json');

function readProducts() {
  const data = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(data);
}

function writeProducts(products: any[]) {
  fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
}

// GET /api/products/[id] - Get product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const products = readProducts();
  const product = products.find((p: any) => p.id === parseInt(id));

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT /api/products/[id] - Update product by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const products = readProducts();
  const index = products.findIndex((p: any) => p.id === parseInt(id));

  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  products[index] = { ...products[index], ...body, id: parseInt(id) };
  writeProducts(products);

  return NextResponse.json(products[index]);
}

// DELETE /api/products/[id] - Delete product by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const products = readProducts();
  const index = products.findIndex((p: any) => p.id === parseInt(id));

  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const deleted = products.splice(index, 1);
  writeProducts(products);

  return NextResponse.json(deleted[0]);
}
