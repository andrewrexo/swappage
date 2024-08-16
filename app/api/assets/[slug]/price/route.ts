import getPriceBySlugs from '@/lib/widgets/swap/lib/coinmarketcap/pricing';
import type { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;

  if (!slug) {
    return Response.json(
      { error: 'An error has occurred with the provided slug.' },
      { status: 400 },
    );
  }

  try {
    const assets = await getPriceBySlugs([slug, 'ETH']);
    if (assets) return Response.json(assets);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch available assets' },
      { status: 500 },
    );
  }
}
