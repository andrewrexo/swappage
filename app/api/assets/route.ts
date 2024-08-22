import getAvailableAssets, {
  ExodusAsset,
  SupportedNetwork,
} from '@/lib/widget/lib/exodus/asset';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const networks = req.nextUrl.searchParams.get('networks');
  const query = req.nextUrl.searchParams.get('query');
  const page = req.nextUrl.searchParams.get('page');
  const limit = req.nextUrl.searchParams.get('limit');

  if (!networks) {
    return Response.json({ error: 'No networks provided' }, { status: 400 });
  }

  const hiddenAssets = ['(wormhole)', '2.0'];

  const filterAssets = (assets: ExodusAsset[]) => {
    return assets.filter(
      (asset) =>
        !hiddenAssets.some((hiddenAsset) =>
          asset.name.toLowerCase().includes(hiddenAsset),
        ),
    );
  };

  try {
    const assets = await getAvailableAssets(
      networks.split(',') as SupportedNetwork[],
      {
        ...(query && { query }),
        ...(page && { page }),
        ...(limit && { limit }),
      },
    );

    if (assets) return Response.json(filterAssets(assets));
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch available assets' },
      { status: 500 },
    );
  }
}
