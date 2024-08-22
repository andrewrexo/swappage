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
> = {
  ethereum: 'blue',
  bitcoin: 'yellow',
  monero: 'orange',
  solana: 'teal',
  avalanche: 'ruby',
  polygon: 'purple',
  optimism: 'red',
  arbitrum: 'indigo',
  basemainnet: 'iris',
};

export default networkToColor;
