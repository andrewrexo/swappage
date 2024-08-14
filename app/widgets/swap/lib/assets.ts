export interface Asset {
  code: string;
  symbol: string;
  name: string;
  network: string;
  address: string;
  decimals: number;
  icon: string;
  lastPriceUsd: number;
  lastPriceUsdChange24h: number;
  blockExplorerUrl: BlockExplorer;
}

export interface BlockExplorer {
  address: {
    [key: string]: string;
  };
  transaction: {
    [key: string]: string;
  };
}
