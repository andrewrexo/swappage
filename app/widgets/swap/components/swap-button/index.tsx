'use client';

import { Button } from '@radix-ui/themes';
import { AnimatePresence, AnimationProps, motion } from 'framer-motion';
import { Loader2Icon, LucideLink } from 'lucide-react';
import { useState } from 'react';
import { ArrowTopRightIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';

export function SwapButton({ connected }: { connected: boolean }) {
  const [isResponding, setIsResponding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const textVariants: AnimationProps['variants'] = {
    initial: { y: 0 },
    hover: {
      y: [0, -3, 0],
      transition: {
        duration: 0.75,
        delay: 0.3,
        ease: 'anticipate',
      },
    },
  };

  const iconVariants = {
    initial: {
      y: 0,
      opacity: 1,
    },
    hover: {
      y: [0, -2, 0],
      scale: [1, 1.025, 1],
      transition: {
        opacity: [1, 1, 1],
        duration: 1.5,
        repeat: 2,
        ease: 'circInOut',
      },
    },
  };

  const iconTransformVariants = {
    arrowTopRight: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.4 },
    },
    paperPlane: { scale: 1.1, opacity: 0 },
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
            className="relative ml-auto h-6 w-6"
          >
            <motion.div
              className="absolute inset-0"
              initial="arrowTopRight"
              animate={isHovered ? 'paperPlane' : 'arrowTopRight'}
              variants={iconTransformVariants}
              transition={{ duration: 0.3 }}
            >
              <DoubleArrowRightIcon className="h-6 w-6" />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <ArrowTopRightIcon className="h-6 w-6" />
            </motion.div>
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
    <Button size="4" className="overflow-hidden" variant="surface" asChild>
      <motion.div
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
        whileHover="hover"
        whileTap={{
          scale: 0.95,
          transition: {
            duration: 0.5,
            ease: 'easeInOut',
          },
        }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
      >
        {renderButtonText()}
      </motion.div>
    </Button>
  );
}
