import { useMediaQuery } from '../../lib/hooks';
import { Dialog, Flex, Text, Theme, VisuallyHidden } from '@radix-ui/themes';
import { Drawer } from 'vaul';
import { ReactNode } from 'react';
import '@radix-ui/themes/tokens/base.css';
import '@radix-ui/themes/styles.css';
import { XIcon } from 'lucide-react';
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

  if (isMobile) {
    return (
      <Drawer.Root open={open} onOpenChange={setOpen}>
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
          <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          <Theme
            appearance="dark"
            accentColor="mint"
            grayColor="mauve"
            radius="large"
            scaling="105%"
          >
            <Drawer.Content
              autoFocus
              className={twMerge(
                `h-[${height}]`,
                `fixed bottom-0 left-0 right-0 flex flex-col rounded-t-md bg-[var(--color-background)]`,
              )}
            >
              <Drawer.Close className="absolute right-4 top-4">
                <XIcon className="h-6 w-6 text-accent" />
              </Drawer.Close>
              <div className="flex-1 rounded-t-3xl bg-surface p-6">
                <div className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-[var(--accent-8)]" />
                <Drawer.Title>
                  <Text weight="medium" size="8" className="">
                    {title}
                  </Text>
                </Drawer.Title>
                {description && (
                  <Dialog.Description>
                    <Text>{description}</Text>
                  </Dialog.Description>
                )}
                <Flex direction="column" className="mx-auto" mt="4">
                  {children}
                </Flex>
              </div>
            </Drawer.Content>
          </Theme>
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>
      <Dialog.Content
        style={{
          background: 'var(--gray-1)',
        }}
        maxHeight="90vh"
        className="fle rounded-3xl border border-[var(--gray-9)] bg-[var(--gray-1)]"
      >
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <XIcon className="h-6 w-6 text-accent" />
        </Dialog.Close>
        <Dialog.Title className="pb-2" color="gray">
          {title}
        </Dialog.Title>
        <VisuallyHidden>
          {<Dialog.Description>{title}</Dialog.Description>}
        </VisuallyHidden>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
}
