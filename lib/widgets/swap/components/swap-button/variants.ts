import type { AnimationProps } from 'framer-motion';

const text: AnimationProps['variants'] = {
  initial: { y: 0 },
  hover: {
    y: [0, -3, 0],
    transition: {
      duration: 0.75,
      delay: 0.3,
      ease: 'anticipate',
    },
  },
  active: {
    y: [0, -3, 0],
    transition: {
      duration: 0.75,
      delay: 0.3,
      ease: 'anticipate',
    },
  },
};

const icon: AnimationProps['variants'] = {
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
  active: {
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

const transform: Record<string, AnimationProps['variants']> = {
  doubleArrow: {
    initial: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.4 },
    },
    hover: {
      scale: 1.1,
      opacity: 0,
      transition: { duration: 0.3 },
    },
    active: {
      scale: 1.1,
      opacity: 0,
      transition: { duration: 0.3 },
    },
  },
  singleArrow: {
    initial: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
    hover: {
      opacity: 1,
      transition: { duration: 0.3, delay: 0.4 },
    },
    active: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
  },
};

const button: AnimationProps['variants'] = {
  execute: {
    scale: 1,
    filter: [
      'brightness(1) contrast(1)',
      'brightness(1.1) contrast(1.05)',
      'brightness(1) contrast(1)',
    ],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
  waiting: {
    scale: 1,
    x: [-1, 1, 0],
    y: [-1, 1, 0],
    rotate: [0, 0, 0],
    filter: [
      'brightness(1) contrast(1)',
      'brightness(1.05) contrast(1.025)',
      'brightness(1) contrast(1)',
    ],
    transition: {
      duration: 1.0,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

const variants = {
  text,
  icon,
  transform,
  button,
};

export { variants };
