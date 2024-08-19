import { ButtonProps, Grid } from '@radix-ui/themes';
import React from 'react';

interface ButtonGroupProps {
  children: React.ReactElement[];
  size: ButtonProps['size'];
  variant: ButtonProps['variant'];
}

export function ButtonGroup({
  children,
  size = '1',
  variant = 'soft',
}: ButtonGroupProps) {
  const columns =
    children.length === 1 ? '1fr' : `repeat(${children.length}, 1fr)`;

  return (
    <Grid columns={columns}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement<ButtonProps>(child)) {
          let style = { ...child.props.style };

          if (index === 0) {
            style = {
              ...style,
              borderTopRightRadius: '0',
              borderBottomRightRadius: '0',
            };
          } else if (index === children.length - 1) {
            style = {
              ...style,
              borderTopLeftRadius: '0',
              borderBottomLeftRadius: '0',
            };
          } else {
            style = {
              ...style,
              borderRadius: '0',
            };
          }
          return React.cloneElement(child, {
            style,
            size,
            variant,
          } as ButtonProps);
        }
        return child;
      })}
    </Grid>
  );
}
