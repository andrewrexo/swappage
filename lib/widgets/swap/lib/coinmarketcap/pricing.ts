import { authenticatedCMCRequest } from './fetch';

const getPriceBySlugs = async (slugs: string[]) => {
  if (!Array.isArray(slugs) || slugs.length === 0) {
    throw new Error('Slugs must be a valid array');
  }

  const request = authenticatedCMCRequest(
    `v1/cryptocurrency/quotes/latest?symbol=${slugs.join(',')}`,
  );

  const response = await fetch(request, {
    next: {
      revalidate: 1000,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch asset prices');
  }

  const data = await response.json();
  if (!data.data) {
    throw new Error('No pricing data found in response');
  }

  const prices = Object.values(data.data).map((item: any) => ({
    symbol: item.symbol,
    price: item.quote.USD.price,
  }));

  return prices;
};

export default getPriceBySlugs;
