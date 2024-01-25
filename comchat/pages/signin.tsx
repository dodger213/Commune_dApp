import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../config/firebase';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MetaMaskImage from '../public/metamask.svg'
import Image from "next/image";

export default function SignInPage() {
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: 200 }}>Welcome to COM Chat</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                    display: 'flex',
                    justifyContent: 'center'
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <div className='flex items-center justify-center mt-3 bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer mx-auto'
                        onClick={openConnectModal}
                        style={{ display: 'flex', cursor: 'pointer', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', height: '40px', width: '220px', padding: '8px 16px' }}>
                        <Image src={MetaMaskImage} alt='login with Metamask' width={20} height={20} className='cursor-pointer' style={{ marginLeft: '-1.9rem', alignItems: 'center', justifyContent: 'center', display: 'flex' }} />
                        <span style={{ color: 'black', alignItems: 'center', justifyContent: 'center', display: 'flex', padding: '0.2rem', fontSize: '14px', marginLeft: '0.5rem' }}>
                          Sign in with Wallet
                        </span>
                      </div>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button" style={{ boxShadow: 'rgb(0 0 0 / 98%) 3px 3px 3px 3px' }}>
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div style={{ display: 'flex', gap: 12 }} className='flex items-center flex-col justify-center'>
                      <button
                        onClick={openChainModal}
                        style={{ display: 'flex', alignItems: 'center' }}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: 'hidden',
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <Image
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                width={12}
                                height={12}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>

                      <button onClick={openAccountModal} type="button">
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ''}
                      </button>

                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
}