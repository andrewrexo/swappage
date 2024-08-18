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
      transition: { duration: 0.3, delay: 0.4 },
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

const variants = {
  text,
  icon,
  transform,
};

export { variants };
