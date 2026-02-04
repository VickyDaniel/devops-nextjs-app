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

// GET /api/products - Get all products
export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  const body = await request.json();
  const products = readProducts();

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map((p: any) => p.id)) + 1 : 1,
    name: body.name,
    price: body.price,
    stock: body.stock || 0
  };

  products.push(newProduct);
  writeProducts(products);

  return NextResponse.json(newProduct, { status: 201 });
}
