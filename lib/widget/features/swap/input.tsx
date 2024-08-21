import { Flex } from '@radix-ui/themes';
import { ArrowDownIcon } from 'lucide-react';
import { AssetControl } from '../../components/asset-control';
import { MotionIconButton } from '../../components/ui/radix-motion';
import { motion, useAnimationControls } from 'framer-motion';
import { useState } from 'react';
import { useAppDispatch, useAppSelector, useMediaQuery } from '../../lib/hooks';
import { reverseAssets, setFromAsset, setToAsset } from './slice';
import { twMerge } from 'tailwind-merge';
import { AssetDialog } from '../../components/asset-dialog';
import type { ExodusAsset } from '../../lib/exodus/asset';

export function SwapInput() {
  const { status, currentRate } = useAppSelector((state) => state.rates);
  const { activeDirection } = useAppSelector((state) => state.swap);

  const dispatch = useAppDispatch();
  const iconControls = useAnimationControls();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [rotate, setRotate] = useState(0);
  const [rotating, setRotating] = useState(false);

  const handleAssetSelect = (asset: ExodusAsset) => {
    if (activeDirection === 'from') {
      dispatch(setFromAsset(asset));
    } else {
      dispatch(setToAsset(asset));
    }

    setIsDialogOpen(false);
  };

  const onArrowClick = () => {
    const newRotation = rotate + 180;
    setRotate(newRotation);
    setRotating(true);

    iconControls.start({
      rotate: newRotation,
      x: [-1, 1, 0],
      y: [-1, 1, 0],
      scaleX: [1, 1.3, 1],
      scaleY: [1, 1.3, 1],
      filter: [
        'brightness(1) contrast(1) blur(0px)',
        'brightness(1.75) contrast(1.75) blur(2px)',
        'brightness(1) contrast(1) blur(0px)',
      ],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    });

    swapAssets();
    setRotating(false);
  };

  const swapAssets = () => {
    dispatch(reverseAssets());
  };

  const handleDialogOpen = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Flex
      direction="column"
      align="center"
      gap={currentRate ? (isMobile ? '4' : '2') : '4'}
    >
      <AssetControl side="from" setOpen={handleDialogOpen} />
      {currentRate && (
        <motion.div
          className={twMerge(
            'mt-2',
            'transition-all duration-300',
            status === 'loading' && !rotating && `pointer-events-none`,
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
      <AssetControl side="to" setOpen={handleDialogOpen} />
      <AssetDialog
        open={isDialogOpen}
        setOpen={handleDialogOpen}
        onAssetSelect={handleAssetSelect}
      >
        <div></div>
      </AssetDialog>
    </Flex>
  );
}
