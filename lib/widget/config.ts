import type { SwapWidgetProps } from './swap-widget';

const widgetOpts: SwapWidgetProps = {
  width: '440px',
  height: '420px',
  theme: 'light',
  backgroundColor: 'white',
  textColor: 'black',
  assetMode: 'input',
  ratesMode: 'fixed',
  className: '',
};

export const animVariants = {
  animate: {
    height: 'auto',
    opacity: 1,
    scale: 1,
    transition: {
      height: {
        duration: 0.5,
        ease: 'anticipate',
      },
      opacity: {
        duration: 0.3,
        delay: 0.2,
      },
      scale: {
        duration: 0.3,
        delay: 0.2,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    scale: 0.8,
    transition: {
      height: {
        duration: 0.5,
        ease: 'easeInOut',
      },
      opacity: {
        duration: 0.3,
      },
      scale: {
        duration: 0.3,
      },
    },
  },
};

export default widgetOpts;
