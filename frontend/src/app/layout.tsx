'use client';

import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  coinbaseWallet,
  metaMaskWallet,
  walletConnectWallet,
  uniswapWallet,
  phantomWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';

import {
  mainnet,
  polygon,
  avalanche,
  sepolia,
  polygonMumbai
} from 'wagmi/chains';
import {
  createConfig,
  configureChains,
  WagmiConfig
} from "wagmi";
import {
  publicProvider
} from "wagmi/providers/public";

import '@fontsource/source-code-pro';

import { projectId } from '../config';

import Footer from './components/footer/footer';
import NavigationBar from './components/navbar/navbar';
import ThemeProvider from './toggle-theme-provider';
import Head from './head';

import './globals.css';

const { chains, publicClient } = configureChains(
  [
    mainnet,
    polygon,
    avalanche,
    sepolia,
    polygonMumbai
  ],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ projectId, chains }),
      phantomWallet({ chains }),
      walletConnectWallet({ projectId, chains }),
      coinbaseWallet({ appName: 'commune', chains })
    ],
  },
  {
    groupName: 'More',
    wallets: [
      rainbowWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      uniswapWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
  )
}
