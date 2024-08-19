import { Box } from '@radix-ui/themes';

export function GreenDot() {
  return (
    <Box
      width="8px"
      height="8px"
      position="absolute"
      mt="1"
      ml="-1"
      left="0"
      style={{
        backgroundColor: 'var(--teal-9)',
        borderRadius: '100%',
      }}
    />
  );
}
