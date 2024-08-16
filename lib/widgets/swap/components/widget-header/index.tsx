import { Flex, IconButton } from '@radix-ui/themes';
import { HistoryIcon, MenuIcon } from 'lucide-react';

export function WidgetHeader() {
  return (
    <Flex justify="between" align="center" gap="2">
      <IconButton variant="ghost" size="1" className="cursor-pointer">
        <HistoryIcon />
      </IconButton>
      <IconButton variant="ghost" size="1" className="cursor-pointer">
        <MenuIcon />
      </IconButton>
    </Flex>
  );
}
