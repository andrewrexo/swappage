'use client';

import { Button, Spinner, Text } from '@radix-ui/themes';
import { motion, useAnimationControls } from 'framer-motion';
import { Loader2Icon, LucideLink, StopCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  ArrowTopRightIcon,
  Cross2Icon,
  DoubleArrowRightIcon,
  StopIcon,
} from '@radix-ui/react-icons';
import { twMerge } from 'tailwind-merge';
import { variants } from './variants';

const MotionText = motion(Text);

export function SwapButton({
  connected,
  fullWidth,
  onExecute,
  isComplete,
  isResponding = false,
  disabled = false,
}: {
  connected: boolean;
  fullWidth?: boolean;
  onExecute: () => void;
  isComplete: boolean;
  isResponding?: boolean;
  disabled?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const controls = useAnimationControls();

  // Play animation every 20 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isResponding && !isHovered && !isExecuting) {
        controls.start('active').then(() => {
          controls.start('initial');
        });
      }
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const onHoverStart = () => {
    setIsHovered(true);
    controls.start('hover');
  };

  const onHoverEnd = () => {
    setIsHovered(false);
    controls.start('initial');
  };

  const onClick = () => {
    if (disabled) {
      return;
    }

    setIsExecuting(true);

    controls.stop();
    controls.start(variants.button.execute).then(() => {
      controls.start(variants.button.waiting);
    });

    onExecute();
  };

  const renderButtonText = () => {
    if (connected) {
      return (
        <>
          <motion.span
            className={twMerge(
              !disabled && 'bg-gradient-accent bg-clip-text text-transparent',
              'animate-gradient-x',
            )}
            variants={variants.text}
            initial="initial"
            animate={controls}
          >
            {disabled ? `Unavailable` : `Swap now`}
          </motion.span>
          {isExecuting ? (
            <motion.div
              variants={variants.icon}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative ml-auto h-4 w-4"
            >
              <Spinner className="" />
            </motion.div>
          ) : disabled ? (
            <div className="relative ml-auto h-6 w-6">
              <Cross2Icon width="24" height="24" />
            </div>
          ) : (
            <motion.div
              variants={variants.icon}
              animate={controls}
              className="relative ml-auto h-6 w-6"
            >
              <motion.div
                className="absolute inset-0"
                initial="arrowTopRight"
                animate={controls}
                variants={variants.transform.doubleArrow}
                transition={{ duration: 0.3 }}
              >
                <DoubleArrowRightIcon className="h-6 w-6" />
              </motion.div>
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={controls}
                variants={variants.transform.singleArrow}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <ArrowTopRightIcon className="h-6 w-6" />
              </motion.div>
            </motion.div>
          )}
        </>
      );
    }

    return (
      <>
        <motion.span variants={variants.text} animate={controls}>
          Connect
        </motion.span>
        {isResponding ? (
          <Loader2Icon className="ml-auto h-4 w-4 animate-spin transition-all duration-200" />
        ) : (
          <motion.div
            variants={variants.icon}
            animate={controls}
            className="ml-auto"
          >
            <LucideLink />
          </motion.div>
        )}
      </>
    );
  };

  return (
    <Button
      size="4"
      className={twMerge(
        'cursor-pointer overflow-hidden',
        fullWidth ? 'w-full' : 'w-auto',
      )}
      name="execute-swap"
      variant="surface"
      asChild
      disabled={disabled || !connected}
    >
      <motion.div
        initial="initial"
        animate={controls}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        onTap={onClick}
        whileTap={{ scale: 0.95 }}
        className="animate-gradient-x"
        style={{
          boxShadow: '0 0 0 1px var(--accent-a7)',
          backgroundImage:
            'linear-gradient(to right, var(--accent-2), var(--accent-3), var(--accent-1))',
        }}
      >
        {renderButtonText()}
      </motion.div>
    </Button>
  );
}
