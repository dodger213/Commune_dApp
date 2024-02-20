"use client";

import {
  RainbowKitProvider,
  darkTheme,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  rainbowWallet,
  trustWallet,
  enkryptWallet,
  okxWallet,
  ledgerWallet,
  talismanWallet,
  metaMaskWallet
} from '@rainbow-me/rainbowkit/wallets';

import {
  mainnet,
  polygon,
  avalanche,
  sepolia,
  polygonMumbai,
} from "wagmi/chains";
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

import "@fontsource/source-code-pro";

import { projectId } from "../config";

import Footer from "./components/footer/footer";
import NavigationBar from "./components/navbar/navbar";
import ThemeProvider from "./toggle-theme-provider";
import Head from "./head";

import './globals.css';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, avalanche, sepolia, polygonMumbai],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId, chains }), // Metamask,
      ...(projectId ? [talismanWallet({ projectId, chains })] : []),
      ...(projectId ? [enkryptWallet({ projectId, chains })] : []),
      ...(projectId ? [trustWallet({ projectId, chains })] : []),
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
