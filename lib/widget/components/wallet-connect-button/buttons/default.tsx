import { type ButtonProps, Button } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const DefaultButton = ({
  children,
  onClick,
  accountOnly = false,
  ...props
}: {
  children: ReactNode;
  onClick?: () => void;
  accountOnly?: boolean;
} & ButtonProps) => {
  return (
    <Button
      variant={accountOnly ? 'surface' : 'surface'}
      asChild
      className="flex cursor-pointer"
      onClick={onClick}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        {...(!accountOnly ? { whileHover: { scale: 1.02 } } : {})}
      >
        {children}
      </motion.div>
    </Button>
  );
};
