const networkToColor: Record<
  string,
  | 'blue'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'gray'
  | 'gold'
  | 'bronze'
  | 'brown'
  | 'amber'
  | 'tomato'
  | 'pink'
  | 'plum'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'teal'
  | 'cyan'
> = {
  ethereum: 'blue',
  ETH: 'blue',
  'arbitrum-one': 'cyan',
  base: 'iris',
  matic: 'violet',
  bitcoin: 'yellow',
  monero: 'orange',
  solana: 'teal',
  avalanche: 'ruby',
  polygon: 'purple',
  optimism: 'red',
  ethereumarbone: 'cyan',
  basemainnet: 'iris',
};

export default networkToColor;
