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
  title: ReactNode | string;
  open?: boolean;
  triggerBlocked?: boolean;
  setOpen?: (open: boolean) => void;
  description?: string;
}

export function ResponsiveDialogDrawer({
  children,
  open,
  trigger,
  title,
  triggerBlocked,
  setOpen,
  description,
}: ResponsiveDialogDrawerProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (triggerBlocked) {
    return <>{trigger}</>;
  }

  const dialogContent = (
    <>
      <Flex as="div" className="flex-shrink-0 pt-4 text-[var(--accent-11)]">
        {title}
      </Flex>
      <VisuallyHidden>
        <Dialog.Title>
          {typeof title === 'string' ? title : 'Drawer'}
        </Dialog.Title>
      </VisuallyHidden>
      <VisuallyHidden>
        <Dialog.Description>{description ?? 'Description'}</Dialog.Description>
      </VisuallyHidden>
      <Flex direction="column" className="relative h-full flex-grow">
        <div className="overflow-auto">{children}</div>
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-8 bg-gradient-to-b from-[var(--color-panel-solid)] to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--color-panel-solid)] to-transparent" />
      </Flex>
    </>
  );

  const drawerContent = (
    <>
      <Flex as="div" className="flex-shrink-0 pt-4 text-[var(--accent-11)]">
        {title}
      </Flex>
      <VisuallyHidden>
        <Dialog.Title>
          {typeof title === 'string' ? title : 'Drawer'}
        </Dialog.Title>
        <Dialog.Description>{description ?? 'Description'}</Dialog.Description>
      </VisuallyHidden>
      <Flex direction="column" className="relative flex-grow overflow-hidden">
        <div className="h-full overflow-auto">{children}</div>
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-8 bg-gradient-to-b from-[var(--color-panel-solid)] to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--color-panel-solid)] to-transparent" />
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
            maxHeight: '80dvh',
          }}
          className="flex flex-col"
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
              `flex flex-col`,
              `h-[85vh] max-h-[85vh]`,
              `transition-all duration-300`,
            )}
            style={{
              background: 'var(--color-panel-solid)',
              borderTopLeftRadius: '2rem',
              borderTopRightRadius: '2rem',
            }}
          >
            <div className="flex-shrink-0 px-6 py-2">
              <Box className="mx-auto mt-6 h-2 w-16 rounded-full bg-[var(--accent-11)]"></Box>
            </div>
            <div className="flex flex-grow flex-col overflow-hidden px-6">
              {content}
            </div>
          </Drawer.Content>
        </Theme>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
