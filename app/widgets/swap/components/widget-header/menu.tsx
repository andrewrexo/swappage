import { IconButton } from '@radix-ui/themes';
import { MenuIcon } from 'lucide-react';

export function Menu() {
  return (
    <IconButton variant="ghost" size="1">
      <MenuIcon />
    </IconButton>
  );
}
