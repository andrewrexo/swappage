import { Flex, Text } from '@radix-ui/themes';
import { ArrowDownIcon } from 'lucide-react';
import { AssetControl } from '../../components/asset-control';
import { MotionIconButton } from '../../components/ui/radix-motion';
import { motion, useAnimationControls } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { reverseAssets, setFromAsset, setToAsset } from './slice';
import { twMerge } from 'tailwind-merge';
import type { ExodusAsset } from '../../lib/exodus/asset';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { toastConfig } from '@/lib/util';

const DynamicAssetDialog = dynamic(
  () => import('../../components/asset-dialog').then((mod) => mod.AssetDialog),
  {
    ssr: true,
  },
);

export function SwapInput() {
  const { status, currentRate, error } = useAppSelector((state) => state.rates);
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

  useEffect(() => {
    if (status === 'failed' && error) {
      toast.error(`${error}`, { ...toastConfig });
    }
  }, [status, error]);

  return (
    <Flex direction="column" align="center" className="gap-4 sm:gap-2">
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
      {status === 'failed' && (
        <Text color="red" size="2">
          Rate unavailable for this pair
        </Text>
      )}
      <AssetControl side="to" setOpen={handleDialogOpen} />
      <DynamicAssetDialog
        open={isDialogOpen}
        setOpen={handleDialogOpen}
        onAssetSelect={handleAssetSelect}
      >
        <div></div>
      </DynamicAssetDialog>
    </Flex>
  );
}
