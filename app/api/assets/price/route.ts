import { removeNonUppercase } from '@/lib/widget/features/swap/api';
import getPriceBySlugs from '@/lib/widget/lib/coinmarketcap/pricing';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const slugs = req.nextUrl.searchParams.get('slugs');

  if (!slugs) {
    return Response.json({ error: 'No slugs provided' }, { status: 400 });
  }

  const transformedSlugs = slugs.split(',').map(removeNonUppercase);

  try {
    const assets = await getPriceBySlugs(slugs.split(','));

    if (assets) {
      return Response.json(assets);
    }
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch available assets' },
      { status: 500 },
    );
  }
}
