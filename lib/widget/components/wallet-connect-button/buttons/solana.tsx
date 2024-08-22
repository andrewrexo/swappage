import type { ButtonProps } from '@radix-ui/themes';
import { WalletPreview } from '../wallet-preview';
import { DefaultButton } from './default';
import { WalletConnectSolana } from '../solana';

export const ButtonSolana = ({
  accountOnly,
  address,
  size = '4',
}: {
  accountOnly: boolean;
  address?: string;
  size: ButtonProps['size'];
}) => {
  return (
    <WalletConnectSolana accountOnly={accountOnly}>
      <DefaultButton
        size={accountOnly ? '2' : size}
        accountOnly={accountOnly}
        style={{ width: '100%' }}
      >
        <WalletPreview
          network="solana"
          isPayment={!accountOnly}
          address={address ?? ''}
          connected={address ? true : false}
        />
      </DefaultButton>
    </WalletConnectSolana>
  );
};
