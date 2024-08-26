import { useState, useEffect, FC } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Box } from '@radix-ui/themes';

interface TokenIconProps {
  identifier: string;
  size?: number;
  fallback?: string;
  className?: string;
}

export const TokenIcon: FC<TokenIconProps> = ({
  identifier,
  size = 24,
  className,
  fallback,
}) => {
  const [iconSrc, setIconSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        // Dynamically import the SVG
        const iconModule = await import(`/public/icons/${identifier}.svg`);
        setIconSrc(iconModule.default);
      } catch (error) {
        const iconModule = await import(`/public/icons/${fallback}.svg`);
        setIconSrc(iconModule.default);
      }
    };

    loadIcon();
  }, [identifier, fallback]);

  if (!iconSrc) {
    return (
      <Box
        width={`${size}px`}
        height={`${size}px`}
        className={twMerge(`rounded-full`, className)}
      />
    );
  }

  return (
    <Image
      src={iconSrc}
      alt={`${identifier} icon`}
      width={size}
      height={size}
      className={twMerge(`rounded-full`, className)}
      priority
    />
  );
};
