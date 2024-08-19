import { FlexProps } from '@radix-ui/themes';
import { MotionProps } from 'framer-motion';
import { MotionFlexUnstyled } from './radix-motion';

type MotionFlexProps = FlexProps & MotionProps;

export function MotionFlex({
  children,
  direction = 'column',
  gap = '4',
  ...props
}: MotionFlexProps) {
  const transition: MotionProps['transition'] = {
    duration: 0.15,
    ease: 'easeInOut',
  };

  const motionFlexProps: MotionFlexProps = {
    direction,
    gap,
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: {
      opacity: 0,
      height: '0px',
      transition: { duration: 0.25, ease: 'easeInOut' },
    },
    transition,
  };
  ``;
  return (
    <MotionFlexUnstyled {...motionFlexProps} {...props}>
      {children}
    </MotionFlexUnstyled>
  );
}
