import { getRateByPairId } from '@/lib/widget/lib/exodus/rate';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { pair_id: string } },
) {
  const pairId = params.pair_id;

  if (!pairId) {
    return NextResponse.json({ error: 'Pair ID is required' }, { status: 400 });
  }

  const userProperties = {
    ip: req.ip || '',
    device: req.headers.get('user-agent') || '',
  };

  const rates = await getRateByPairId(pairId, userProperties.ip);

  return NextResponse.json(rates);
}
