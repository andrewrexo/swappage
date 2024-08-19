const SUPPORTED_PROVIDERS = ['xoswap'] as const;

export type SupportedNetwork = (typeof SUPPORTED_PROVIDERS)[number];
