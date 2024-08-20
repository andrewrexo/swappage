import { Flex } from '@radix-ui/themes';
import { ArrowDownIcon } from 'lucide-react';
import { AssetControl } from '../../components/asset-control';
import { MotionIconButton } from '../../components/ui/radix-motion';
import { motion, useAnimationControls } from 'framer-motion';
import { useState } from 'react';
import { useAppDispatch, useAppSelector, useMediaQuery } from '../../lib/hooks';
import { reverseAssets } from './slice';
import { twMerge } from 'tailwind-merge';

export function SwapInput() {
  const { status, currentRate } = useAppSelector((state) => state.rates);
  const dispatch = useAppDispatch();
  const iconControls = useAnimationControls();

  const [rotate, setRotate] = useState(0);
  const [rotating, setRotating] = useState(false);

  const onArrowClick = () => {
    const newRotation = rotate + 180;
    setRotate(newRotation);
    setRotating(true);

    iconControls.start({
      rotate: newRotation,
    });

    swapAssets();
    setRotating(false);
  };

  const swapAssets = () => {
    dispatch(reverseAssets());
  };

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Flex
      direction="column"
      align="center"
      gap={currentRate ? (isMobile ? '4' : '2') : '4'}
    >
      <AssetControl side="from" />
      {currentRate && (
        <motion.div
          className={twMerge(
            'mt-2',
            'transition-all duration-300',
            status === 'loading' && !rotating && `pointer-events-none blur-sm`,
          )}
        >
          <MotionIconButton
            radius="full"
            variant="ghost"
            whileHover={{ scale: 1.05 }}
            animate={iconControls}
            onClick={onArrowClick}
            disabled={rotating && status === 'loading'}
          >
            <ArrowDownIcon width={24} height={24} />
          </MotionIconButton>
        </motion.div>
      )}
      <AssetControl side="to" />
    </Flex>
  );
}
