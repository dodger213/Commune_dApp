"use client";

import { useState, useEffect, useRef } from 'react';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from 'next/image';

import GitHubLogin from 'react-github-login';

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import {
  useAccount,
  useConnect,
  useSignMessage,
  useDisconnect
} from "wagmi";

import { useAuthRequestChallengeEvm } from "@moralisweb3/next";

import Modal from 'antd/es/modal/Modal';

import MetaMaskImage from '../../../public/svg/metamask.svg'
import GithubImage from '../../../public/svg/github-mark.svg'


const words: string[] = ["developers.", "designers.", "creators.", "everyone.", "<END>"];
const colour: string[] = ["text-[#00000]", "text-[#ffb4ed] dark:text-[#FFD6F5]", "text-[#FF8F8F]  dark:text-[#FF8F8F]", "text-[#ffef40] dark:text-[#FFF7A1]"];

const TITLE = "commune ai";
const TAGLINE = "Renovating the way we build software for ";

export default function HomepageHeader() {

  // blinker
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [isShowAuthModalOpen, setIsShowAuthModalOpen] = useState(false)

  // state of the scroll position and header height
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef<any>(null);
  const [headerHeight, setHeaderHeight] = useState(20);

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    setIsShowAuthModalOpen(false)

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });

    try {
      const result = await requestChallengeAsync({
        address: account,
        chainId: chain.id,
      });

      // Check if the result is undefined
      if (result === undefined) {
        throw new Error('Received undefined result from requestChallengeAsync');
      }

      // Now TypeScript knows that result is definitely not undefined, and you can safely access its properties
      const { message } = result;
      const signature = await signMessageAsync({ message });

      // redirect user after successful authentication to '/user' page
      const signInResponse = await signIn("moralis-auth", {
        message,
        signature,
        redirect: false,
        callbackUrl: "/modules",
      });

      // Check if signInResponse is defined before accessing its properties
      const url = signInResponse?.url;

      // Now you can use 'url' without TypeScript complaining about undefined
      if (url) {
        push(url);

        // Do something with the 'url'
      } else {
        // Handle the case where 'url' is undefined
      }
      // Continue using message as needed
      console.log(message);
    } catch (error) {
      // Handle any errors that might occur during the asynchronous operation
      console.error('Error:', error);
    }

  };

  // typeWriter effect
  // give me the context of this whole useEffect
  useEffect(() => {
    if (index === words.length) return; // if end of words, return
    // if subIndex is equal to the length of the word + 1 and index is not the last word and not reverse
    if (subIndex === words[index].length + 1 && index !== words.length - 1 && !reverse) {
      setReverse(true);
      return;
    }
    // if subIndex is equal to 0 and reverse is true
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => prev + 1);
      return;
    }
    // if reverse is true, subIndex is not 0 and index is not the last word
    if (index === words.length - 1)
      setIndex(() => 0)
    // if reverse is true, subIndex is not 0 and index is not the last word
    // if reverse is false, subIndex is not the length of the word and index is not the last word
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 :
      75, 25));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);


  // blinker effect
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 250);
    if (index === words.length) return;

    return () => clearTimeout(timeout2);
  }, [blink]);

  // Handle scroll position
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  // Add scroll event listener to window
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Get header height on mount and when window is resized
  // This is to offset the scroll position so that the header
  useEffect(() => {
    if (headerRef?.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current]);

  const handleAuthModal = () => {
    setIsShowAuthModalOpen(true)
  }

  const handleShowAuthModalCancel: () => void = () => {
    setIsShowAuthModalOpen(false);
  };

  const onGitHubLoginSuccess = (response: any) => {

    setIsShowAuthModalOpen(false)

    const accessToken = response.code;

    const getUserInfo = async (accessToken: string) => {

      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {

        const userInfo = await response.json();
        // Handle user information (userInfo)
        console.log('------github account------', userInfo);

      } else {
        // Handle error
        console.error('Failed to fetch user information from GitHub API');
      }
    };

    // Call this function with the access token obtained after successful login
    getUserInfo(accessToken);

  }

  const onGitHubLoginFailure = (response: any) => {
    console.log('------the data from github-----failed-----', response);
  }

  const responseMessage = (response: any) => {
    console.log('-----------------------This is the React component-------------------', response);
  };

  const errorMessage = () => {
    console.log('An error has occured')
  };

  return (
    <header ref={headerRef} className={` dark:bg-[#161616] p-[4rem] py-32 text-center overflow-hidden ${getHeaderClasses(scrollPosition, headerHeight)} duration-500`} >

      <img src="gif/logo/CubesShufflingGIF.gif" alt="Commune Logo" className='block sm:hidden' />
      <div className="px-10 py-5">
        <div className='flex lg:flex-row flex-col h-1/2'>
          <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>

            <div className='w-auto sm:w-[710px] sm:h-[250px] '>
              <h1 className=" text-4xl sm:text-6xl sm:pb-3 dark:text-white">{TITLE}</h1>
              <div className='hidden sm:block'>
                <p className="hero__subtitle text-xl sm:text-4xl">{TAGLINE}
                  <br />
                  <span className={`hero__subtitle text-4xl ${colour[index]} font-semibold mb-5`}>{`${words[index].substring(0, subIndex)}${blink ? "|" : ""}`}</span></p>
              </div>
            </div>

            <div className='w-30 h-10'>
              <div
                className='bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold justify-center px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer'
                onClick={handleAuthModal}
              >
                Get Started
              </div>
            </div>

          </div>

          <div className='hidden sm:block w-full lg:w-[75%] h-full lg:-mr-44 '>
            <img src="gif/logo/CubesShufflingGIF.gif" alt="Commune Logo" className='' />
          </div>

        </div>
      </div>

      {
        <Modal open={isShowAuthModalOpen} onCancel={handleShowAuthModalCancel} footer={null} width={500}>
          <div className='flex items-center justify-center'>
            <span style={{ fontWeight: '500', alignItems: 'center', display: 'flex', fontSize: '2rem' }}>
              Welcome to Commune ai
            </span>
          </div>

          <div className='flex items-center justify-evenly mt-14 mb-14 flex-col'>

            <div className='flex w-full items-center justify-evenly cursor-pointer'>

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
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <div className='flex items-center justify-center' style={{ flexDirection: 'column' }} onClick={openConnectModal}>
                              <Image src={MetaMaskImage} alt='login with Metamask' width={40} height={40} className='cursor-pointer' />
                              <button type="button">
                                Connect Wallet
                              </button>
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
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      style={{ width: 12, height: 12 }}
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </button>

                            <button type="button" style={{ color: 'darkcyan' }}>
                              Connected
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

              <div className='flex items-center justify-center' style={{ flexDirection: 'column' }}>
                <Image src={GithubImage} alt='login with Github' width={40} height={40} className='cursor-pointer' />
                <GitHubLogin clientId='8386c0df1514607054e7'
                  buttonText="Continue with Github"
                  style={{ marginTop: '8px' }}
                  onSuccess={onGitHubLoginSuccess}
                  onFailure={onGitHubLoginFailure}
                  redirectUri={'http://localhost:3000/modules'}
                />
              </div>
            </div>

          </div>
        </Modal>
      }
    </header>
  );
}

export const getHeaderClasses = (position: number, height: number) => {
  if (position > (height / 2)) {
    return 'rounded-b-lg shadow-lg mx-5';
  }
  return '';
}
