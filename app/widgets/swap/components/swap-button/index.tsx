'use client';

import { Button } from '@radix-ui/themes';
import { Loader2Icon, LucideArrowUpRight, LucideLink } from 'lucide-react';
import { useState } from 'react';

export function SwapButton({ connected }: { connected: boolean }) {
  const [isResponding, setIsResponding] = useState(false);

  const renderButtonText = () => {
    if (connected) {
      return (
        <>
          Swap now
          <LucideArrowUpRight className="ml-auto h-6 w-6" />
        </>
      );
    }

    return (
      <>
        Connect
        {isResponding ? (
          <Loader2Icon className="ml-auto h-4 w-4 animate-spin transition-all duration-200" />
        ) : (
          <LucideLink className="ml-auto" />
        )}
      </>
    );
  };

  return (
    <Button
      size="4"
      className="w-full cursor-pointer transition-all duration-200 hover:scale-[1.025]"
      variant="surface"
    >
      {renderButtonText()}
    </Button>
  );
}
