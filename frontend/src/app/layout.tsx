"use client";
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  okxWallet,
  ledgerWallet,
  metaMaskWallet
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, sepolia, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import "@fontsource/source-code-pro";
import { projectId } from "../config";
import Head from '@/components/templates/head';
import Footer from '@/components/templates/footer/footer';
import NavigationBar from '@/components/organisms/navbar/navigation-bar';
import ThemeProvider from '@/context/toggle-theme-provider';

import './globals.css';
import 'reactflow/dist/style.css';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, sepolia, goerli],
  [
    alchemyProvider({ apiKey: 'Pg7_v8x8SlXaP0ZsI90QrGFxOEEJBCtA' }),
    publicProvider()
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }), // Metamask
      ...(projectId ? [walletConnectWallet({ projectId, chains })] : []),
      ...(projectId ? [trustWallet({ projectId, chains })] : []),
      // walletConnectWallet({ projectId, chains }),
      // trustWallet({ projectId, chains }),
      // Add more recommended wallets as needed
    ],
  },
  {
    groupName: 'Other',
    wallets: [
      ...(projectId ? [rainbowWallet({ projectId, chains })] : []),
      ...(projectId ? [okxWallet({ projectId, chains })] : []),
      ...(projectId ? [ledgerWallet({ projectId, chains })] : []),

      // rainbowWallet({ projectId, chains }),
      // coinbaseWallet({ projectId, chains }),
      // okxWallet({ projectId, chains }),
      // ledgerWallet({ projectId, chains }),
      // Add other wallets to the "Other" group
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head />
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} coolMode theme={darkTheme()}>
            {/* <Provider store={store}> */}
            <ThemeProvider>
              {/* <Banner /> */}
              <NavigationBar />
              {children}
              <Footer />
            </ThemeProvider>
            {/* </Provider> */}
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
