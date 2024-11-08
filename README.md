# Swappage

Swappage is an exploratory project focused on crypto cross-chain swaps. The app and API is built with [Next.js](https://nextjs.org/) - everything has been designed to stand out as an intuitive user experience in a sea of complicated crypto app UIs. It supports simultaneous wallet connections from both EVM-compatible networks and Solana, making it versatile for a wide range of users. My goal is to expand offerings to include more routes for swapping, bridging, and P2P offerings.


## Features

- **Cross-Chain Swapping**: Allows swaps between Solana and Ethereum assets, connecting the best of both ecosystems.
- **Wallet Integration**: Supports multiple wallet providers for EVM and Solana, giving users flexibility in how they connect.
- **Modern Tech Stack**: Built using **Next.js** for the front-end, **Supabase** for managing swap order data, and **Radix UI** for accessible UI components.
- **Dynamic Rates**: Real-time rate fetching and updates for optimal trading decisions.

## Tech Stack

- **Next.js**: The core framework used to deliver a responsive and fast front-end.
- **Radix UI**: Used as the foundation for accessible and highly customizable components.
- **Supabase**: For storing and persisting swap orders, ensuring seamless and consistent transaction records.
- **Web3 Wallet Connections**: Support for wallets across both **EVM** and **Solana** ecosystems, enabling broader compatibility.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js >= 14.0.0
- NPM or Yarn
- Wallet provider extensions (e.g., MetaMask, Phantom)
- Postgres database; specifically, this repo is using `Supabase`

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/andrewrexo/swappage.git
    cd swappage
    ```

2. **Install the dependencies**:
    ```bash
    bun install
    # or
    npm/yarn install
    ```

3. **Setup environment variables for Supabase**:
    - Create a `.env.local` file in the root directory.
    - Add Supabase keys and configuration:
    ```plaintext
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```

4. **Setup environment variables for CoinMarketCap pricing data**:
    - Edit your `.env.local` file as follows:
    ```plaintext
    COINMARKETCAP_API_KEY=your-cmc-api-key
    ```

5. **Create schema on your Postgres DB**:
    - Execute the following script:
    ```sql
    CREATE TABLE swaps (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        order_id VARCHAR(50) NOT NULL UNIQUE,
        provider_order_id VARCHAR(50),
        from_asset VARCHAR(10) NOT NULL,
        from_asset_network VARCHAR(16) NOT NULL,
        to_asset VARCHAR(10) NOT NULL,
        to_asset_network VARCHAR(16) NOT NULL,
        pair VARCHAR(20) NOT NULL,
        amount_sent DECIMAL(18, 8) NOT NULL,
        amount_sent_usd DECIMAL(19, 4) NOT NULL,
        amount_received DECIMAL(18, 8) NOT NULL,
        amount_received_usd DECIMAL(19, 4) NOT NULL,
        deposit_txid VARCHAR(50),
        receive_txid VARCHAR(50),
        rate DECIMAL(18, 8) NOT NULL,
        created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        last_update TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user_from_address VARCHAR(100) NOT NULL,
        user_to_address VARCHAR(100) NOT NULL,
        status VARCHAR(20) NOT NULL
    );

    INSERT INTO swaps (
        order_id, provider_order_id, from_asset, from_asset_network, to_asset, to_asset_network, pair, amount_sent, amount_sent_usd, amount_received, amount_received_usd, rate, created, last_update, user_from_address, user_to_address, status
    ) VALUES
    ('xVgt-HRnm9-KP7wqF', 'provider-id-1', 'BTC', 'bitcoin', 'ETH', 'ethereum', 'BTC_ETH', 0.5, 100.5, 7.25, 14.5, 172.512, '2023-04-15 10:30:00+00', '2023-04-15 10:40:00+00', '1BvBMSEYstWetqTFnLoE7tGFg7xJaNVN2', '0x742d35Cay73rta532925a3b844Bc454e4438f44e', 'completed'),
    ('B3fD-J2ytL-MzX5nQ', 'provider-id-2', 'ETH', 'ethereum', 'USDT', 'tron', 'ETH_USDT', 2.0, 4001.24, 4001.0, 1800.0, 3998.12, '2023-04-16 14:45:00+00', '2023-04-16 10:02:00+00', '0x742d35Cay73rta532925a3b844Bc454e4438f44e', 'TKwDiBf89XA1yoqjbT4scdJBXPUWY9Xio', 'completed'),
    ('p7KW-r4RAs-6EHN9T', 'provider-id-3', 'LTC', 'litecoin', 'BTC', 'bitcoin', 'LTC_BTC', 10.0, 3218, 0.175, 0.0175, 3200, '2023-04-17 09:15:00+00', '2023-04-17 09:15:00+00', 'LE8s7boZlgSBNNHUCA2qBHRX5xGx1vY9qp', '1BvBMSEYstWetqTFnLoE7tGFg7xJaNVN2', 'pending');

    ALTER TABLE swaps ENABLE ROW LEVEL SECURITY;

    CREATE INDEX idx_swaps_order_id ON swaps(order_id);
    CREATE INDEX idx_swaps_created ON swaps(created);
    ```

### Running the App

To run the app in development mode, execute one of the following commands:

```bash
bun dev
# or
npm/yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Connect your wallet**: Use the "Connect" button to link your wallet from the Solana or EVM ecosystem.
2. **Select tokens to swap**: Choose which token to swap from and to (e.g., SOL to ETH).
3. **Enter swap amount**: Specify the amount of the token you wish to swap.
4. **Review and swap**: Confirm the rates and swap details before clicking "Swap now".
5. **Complete swap**: Prompt the user's wallet or permit manual TXs via deposit address / QR code.
6. **Monitor swap progress**: Watch the status change on your order as you wait for order completion!

## Project Structure

- **/lib/widget/components**: Shared React components.
- **/lib/widget/features**: Contains folders for all "features", typically referring to different routes or contextually unrelated components.
- **/app/api**: Contains all server-side API logic for fetching rates and placing exchange orders.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions or suggestions, feel free to reach out via GitHub or open an issue.

---

Feel free to add a star to the repository if you found this useful as a learning reosurce :)
