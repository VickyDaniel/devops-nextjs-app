import { NextResponse } from 'next/server';

// GET /api/health - Health check endpoint (useful for Docker, K8s, Prometheus)
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '1.0.0'
  });
}
