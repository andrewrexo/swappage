import { getRateBulk } from '@/lib/widget/lib/exodus/rate';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  let pairs = req.nextUrl.searchParams.get('pairs');

  if (!pairs) {
    pairs = '';
  }

  const rates = await getRateBulk({
    pairIds: pairs?.split(',') || [],
    userProperties: {
      ip: req.ip || '',
      device: req.headers.get('user-agent') || '',
    },
  });

  return NextResponse.json(rates);
}
