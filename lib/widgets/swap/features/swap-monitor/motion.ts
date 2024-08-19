import { MotionProps } from 'framer-motion';

export const motion: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: -25,
    transition: { duration: 0.25 },
  },
  transition: { duration: 0.3, ease: 'easeInOut' },
};
