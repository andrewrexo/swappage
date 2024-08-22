import { useMediaQuery } from '../../lib/hooks';
import {
  Box,
  Dialog,
  Flex,
  Text,
  Theme,
  VisuallyHidden,
} from '@radix-ui/themes';
import { Drawer } from 'vaul';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { TokenSOL } from '@web3icons/react';

interface ResponsiveDialogDrawerProps {
  children: ReactNode;
  trigger: ReactNode;
  title: ReactNode;
  open?: boolean;
  triggerBlocked?: boolean;
  setOpen?: (open: boolean) => void;
}

export function ResponsiveDialogDrawer({
  children,
  open,
  trigger,
  title,
  triggerBlocked,
  setOpen,
}: ResponsiveDialogDrawerProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (triggerBlocked) {
    return <>{trigger}</>;
  }

  const dialogContent = (
    <>
      <Dialog.Title className="text-[var(--accent-11)]" size="7">
        {title}
      </Dialog.Title>
      <VisuallyHidden>
        {<Dialog.Description>{title}</Dialog.Description>}
      </VisuallyHidden>
      <Flex direction="column" className="h-full flex-grow overflow-auto">
        {children}
      </Flex>
    </>
  );

  const drawerContent = (
    <>
      <Box className="mx-auto mt-6 min-h-2 min-w-16 rounded-full bg-[var(--accent-8)]"></Box>
      <Dialog.Title className="pt-4">
        <Text size="8" weight="bold" className="text-[var(--accent-11)]">
          {title}
        </Text>
      </Dialog.Title>
      <VisuallyHidden>
        {<Dialog.Description>{title}</Dialog.Description>}
      </VisuallyHidden>
      <Flex
        direction="column"
        className="h-full flex-grow overflow-auto transition-all duration-300"
      >
        {children}
      </Flex>
    </>
  );

  if (isMobile) {
    return (
      <DialogDrawer
        trigger={trigger}
        open={open}
        setOpen={setOpen}
        content={drawerContent}
      />
    );
  }

  return (
    <Box>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>{trigger}</Dialog.Trigger>
        <Dialog.Content
          style={{
            background: 'var(--color-background)',
            maxHeight: '80dvh',
          }}
        >
          {dialogContent}
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
}

interface DialogDrawerProps {
  open?: boolean;
  trigger: ReactNode;
  setOpen?: (open: boolean) => void;
  content: ReactNode;
}

const DialogDrawer = ({
  trigger,
  open,
  setOpen,
  content,
}: DialogDrawerProps) => {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={setOpen}
      disablePreventScroll={false}
    >
      <Drawer.Trigger>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Theme>
          <Drawer.Overlay
            className="fixed inset-0 focus:outline-none"
            style={{
              background: 'var(--color-overlay)',
            }}
          />
          <Drawer.Content
            className={twMerge(
              `focus:outline-none`,
              `fixed inset-x-0 bottom-0 top-2`,
              `px-6 py-2`,
              `flex h-[100dvh] max-h-[100dvh] flex-col`,
              `transition-all duration-300`,
            )}
            style={{
              background: 'var(--color-panel-solid)',
              borderTopLeftRadius: '2rem',
              borderTopRightRadius: '2rem',
            }}
          >
            {content}
          </Drawer.Content>
        </Theme>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
