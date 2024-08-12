import { Flex } from '@radix-ui/themes';
import { Menu } from './menu';

export function WidgetHeader() {
  return (
    <Flex justify="between" align="center" gap="2">
      <Menu />
    </Flex>
  );
}
