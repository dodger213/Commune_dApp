import * as React from 'react';
import Head from 'next/head';
import { MyAppProps } from 'next/app';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights as VercelSpeedInsights } from '@vercel/speed-insights/next';


import { Brand } from '~/common/app.config';
import { apiQuery } from '~/common/util/trpc.client';

import 'katex/dist/katex.min.css';
import '~/common/styles/CodePrism.css';
import '~/common/styles/GithubMarkdown.css';
import '~/common/styles/NProgress.css';
import '~/common/styles/app.styles.css';

import { ProviderBackendAndNoSSR } from '~/common/providers/ProviderBackendAndNoSSR';
import { ProviderBootstrapLogic } from '~/common/providers/ProviderBootstrapLogic';
import { ProviderSingleTab } from '~/common/providers/ProviderSingleTab';
import { ProviderSnacks } from '~/common/providers/ProviderSnacks';
import { ProviderTRPCQueryClient } from '~/common/providers/ProviderTRPCQueryClient';
import { ProviderTheming } from '~/common/providers/ProviderTheming';

//wagmi wallet connection
import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
  rainbowWallet,
  walletConnectWallet,
  trustWallet,
  okxWallet,
  ledgerWallet,
  metaMaskWallet
} from '@rainbow-me/rainbowkit/wallets';
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
import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const alchemyApi = 'Pg7_v8x8SlXaP0ZsI90QrGFxOEEJBCtA';
const projectId = 'a0dd23157746b39315f34b62eb614eae';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, goerli],
  [
    alchemyProvider({ apiKey: alchemyApi }),
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
      // okxWallet({ projectId, chains }),
      // ledgerWallet({ projectId, chains }),
      // Add other wallets to the "Other" group
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})

const MyApp = ({ Component, emotionCache, pageProps }: MyAppProps) =>
  <>

    <Head>
      <title>{Brand.Title.Common}</title>
      <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
    </Head>

    <ProviderTheming emotionCache={emotionCache}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains} coolMode theme={lightTheme()}>
          <ProviderSingleTab>
            <ProviderBootstrapLogic>
              <ProviderTRPCQueryClient>
                <ProviderSnacks>
                  <ProviderBackendAndNoSSR>
                    <Component {...pageProps} />
                  </ProviderBackendAndNoSSR>
                </ProviderSnacks>
              </ProviderTRPCQueryClient>
            </ProviderBootstrapLogic>
          </ProviderSingleTab>
        </RainbowKitProvider>
      </WagmiConfig>
    </ProviderTheming>

    <VercelAnalytics debug={false} />
    <VercelSpeedInsights debug={false} sampleRate={1 / 10} />

  </>;

// enables the React Query API invocation
export default apiQuery.withTRPC(MyApp);