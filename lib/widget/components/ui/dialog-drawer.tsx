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

interface ResponsiveDialogDrawerProps {
  children: ReactNode;
  trigger: ReactNode;
  title: string;
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
      <Dialog.Title className="pb-2" color="gray">
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
      <Box className="mx-auto my-4 min-h-1.5 min-w-12 rounded-full bg-[var(--accent-8)]"></Box>
      <Dialog.Title className="pt-4" color="gray">
        <Text size={title.length > 10 ? '8' : '9'}>{title}</Text>
      </Dialog.Title>
      <VisuallyHidden>
        {<Dialog.Description>{title}</Dialog.Description>}
      </VisuallyHidden>
      <Flex direction="column" className="h-full flex-grow overflow-auto py-2">
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
              `fixed inset-x-0 bottom-0`,
              `px-8 py-2`,
              `flex h-[100vh] max-h-[100vh] flex-col`,
            )}
            style={{
              background: 'var(--color-panel-solid)',
            }}
          >
            {content}
          </Drawer.Content>
        </Theme>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
