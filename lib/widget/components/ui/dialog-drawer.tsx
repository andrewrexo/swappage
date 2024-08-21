import { useMediaQuery } from '../../lib/hooks';
import {
  Box,
  Dialog,
  Flex,
  ScrollArea,
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
  description?: string;
  setOpen?: (open: boolean) => void;
  height?: string;
}

export function ResponsiveDialogDrawer({
  children,
  open,
  trigger,
  title,
  triggerBlocked,
  description,
  setOpen,
  height = '70vh',
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
    <Flex direction="column" className="h-full">
      <Box className="mx-auto my-4 min-h-1.5 min-w-12 rounded-full bg-[var(--accent-8)]"></Box>
      <Drawer.Title>
        <Text weight="medium" size="8" className="">
          {title}
        </Text>
      </Drawer.Title>
      {description ? (
        <Dialog.Description>
          <Text>{description}</Text>
        </Dialog.Description>
      ) : (
        <VisuallyHidden>
          {<Dialog.Description>{title}</Dialog.Description>}
        </VisuallyHidden>
      )}
      <ScrollArea className="pt-4">{children}</ScrollArea>
    </Flex>
  );

  if (isMobile) {
    return (
      <Drawer.Root
        open={open}
        onOpenChange={setOpen}
        disablePreventScroll={false}
      >
        <Drawer.Trigger
          asChild
          onClick={() => {
            if (setOpen) {
              setOpen(!open);
            }
          }}
        >
          {trigger}
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 backdrop-blur-sm focus:outline-none" />
          <Theme>
            <Drawer.Content
              className={twMerge(
                `focus:outline-none`,
                `fixed inset-x-0 bottom-0`,
                `bg-[var(--color-surface)] p-4`,
                `flex h-[100dvh] max-h-[100dvh] flex-col`,
              )}
            >
              {drawerContent}
            </Drawer.Content>
          </Theme>
        </Drawer.Portal>
      </Drawer.Root>
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
