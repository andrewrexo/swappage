'use client';

import { Button } from '@radix-ui/themes';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2Icon, LucideArrowUpRight, LucideLink } from 'lucide-react';
import { useState } from 'react';

export function SwapButton({ connected }: { connected: boolean }) {
  const [isResponding, setIsResponding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.025 },
  };

  const textVariants = {
    initial: { y: 0 },
    hover: {
      y: [0, -7, 0],
      transition: {
        duration: 0.4,
        times: [0, 0.5, 1],
        ease: 'circInOut',
      },
    },
  };

  const iconVariants = {
    initial: { y: 0, rotate: 0 },
    hover: {
      y: [0, -10, 0],
      rotate: [0, -45, -45],
      transition: {
        duration: 0.5,
        times: [0, 0.5, 1],
        ease: 'anticipate',
      },
    },
  };

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  const renderButtonText = () => {
    if (connected) {
      return (
        <>
          <motion.span
            variants={textVariants}
            animate={isHovered ? 'hover' : 'initial'}
          >
            Swap now
          </motion.span>
          <motion.div
            variants={iconVariants}
            animate={isHovered ? 'hover' : 'initial'}
            className="ml-auto"
          >
            <LucideArrowUpRight className="h-6 w-6" />
          </motion.div>
        </>
      );
    }

    return (
      <>
        <motion.span
          variants={textVariants}
          animate={isHovered ? 'hover' : 'initial'}
        >
          Connect
        </motion.span>
        {isResponding ? (
          <Loader2Icon className="ml-auto h-4 w-4 animate-spin transition-all duration-200" />
        ) : (
          <motion.div
            variants={iconVariants}
            animate={isHovered ? 'hover' : 'initial'}
            className="ml-auto"
          >
            <LucideLink />
          </motion.div>
        )}
      </>
    );
  };

  return (
    <AnimatePresence>
      <Button size="4" className="overflow-hidden" variant="surface" asChild>
        <motion.div
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          onHoverStart={handleHoverStart}
          onHoverEnd={handleHoverEnd}
        >
          {renderButtonText()}
        </motion.div>
      </Button>
    </AnimatePresence>
  );
}
