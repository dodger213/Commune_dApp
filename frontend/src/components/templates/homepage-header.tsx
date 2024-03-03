"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import GitHubLogin from "react-github-login";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ApiPromise, WsProvider } from "@polkadot/api";
import Modal from "antd/es/modal/Modal";
import MetaMaskImage from "../../../public/svg/metamask.svg";
import GithubImage from "../../../public/svg/github-mark.svg";
import PolkadotImage from "../../../public/svg/polkadot.svg";
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';


const words: string[] = [
  "developers.",
  "designers.",
  "creators.",
  "everyone.",
  "<END>",
];
const colour: string[] = [
  "text-[#00000]",
  "text-[#ffb4ed] dark:text-[#FFD6F5]",
  "text-[#FF8F8F]  dark:text-[#FF8F8F]",
  "text-[#ffef40] dark:text-[#FFF7A1]",
];

const TITLE = "Commune AI";
const TAGLINE = "Renovating the way we build software for ";

export default function HomepageHeader() {

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);
  const [isShowAuthModalOpen, setIsShowAuthModalOpen] = useState(false)

  //user login
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // state of the scroll position and header height
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef<any>(null);
  const [headerHeight, setHeaderHeight] = useState(20);

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
        setIsLoggedIn(true)
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

  const connectWallet = async () => {
      if (typeof window !== 'undefined') {
          try {
              await web3Enable('Commune AI');
              const accounts = await web3Accounts();
              const provider = new WsProvider('wss://rpc.polkadot.io');
              const polkadotAPI = await ApiPromise.create({ provider });
              const address = accounts[0].address;
              const data = await polkadotAPI.query.system.account(address);
          } catch (error) {
              console.error('Error connecting to wallet:', error);
          }
          setIsShowAuthModalOpen(false);
      } else {
          console.error('Cannot connect wallet: Code is running on the server.');
      }
  };

  return (
    <header ref={headerRef} className={` dark:bg-[#161616] p-[4rem] py-32 text-center overflow-hidden ${getHeaderClasses(scrollPosition, headerHeight)} duration-500`} >

      <img src="gif/logo/CubesShufflingGIF.gif" alt="Commune Logo" className='block sm:hidden' />
      <div className="px-10 py-5">
        <div className='flex lg:flex-row flex-col h-1/2'>
          <div className='w-full lg:w-1/2 flex flex-col items-center justify-center'>

            <div className=' w-auto sm:w-[710px] sm:h-[250px] '>
              <h1 className=" text-4xl sm:text-6xl sm:pb-3 dark:text-white">{TITLE}</h1>
              <div className='hidden sm:block'>
                <p className="hero__subtitle text-xl sm:text-4xl dark:text-white">{TAGLINE}
                  <br />
                  <span className={`hero__subtitle text-4xl ${colour[index]} font-semibold mb-5`}>{`${words[index].substring(0, subIndex)}${blink ? "|" : ""}`}</span></p>
              </div>
            </div>

            <div className='w-30 h-10'>
              <div className=' bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold 
                justify-center px-2 py-2 cursor-pointer' onClick={ () => setIsShowAuthModalOpen(true)}>
                Get Started
              </div>
            </div>

          </div>

          <div className='hidden sm:block w-full lg:w-1/2 h-full lg:-mr-44 '>
            <img src="gif/logo/commune.gif" alt="Commune Logo" className='' />
          </div>

        </div>
      </div>

      {
        isShowAuthModalOpen &&
        <Modal open={isShowAuthModalOpen} onCancel={ () => setIsShowAuthModalOpen(false)} footer={null} width={500}>
          <div className='flex items-center justify-center'>
            <span style={{ fontWeight: '500', alignItems: 'center', display: 'flex', fontSize: '2rem' }}>
              Connect to Commune AI
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
                  ready && account && chain && setIsLoggedIn(true);
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
                            <div className='flex items-center justify-center hover:bg-gray-300 p-2 w-[105.77px] h-[105.77px] rounded-md' style={{ flexDirection: 'column', border: '1px solid gray' }} onClick={openConnectModal}>
                              <Image src={MetaMaskImage} alt='login with Metamask' width={50} height={50} className='cursor-pointer mb-1' />
                              <button type="button">
                                Metamask
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

              <div className='flex items-center justify-center p-2 rounded-md hover:bg-gray-300 w-[105.77px] h-[105.77px]' style={{ flexDirection: 'column', border: '1px solid gray' }}>
                <Image src={GithubImage} alt='login with Github' width={50} height={50} className='cursor-pointer mb-1' />
                <GitHubLogin clientId='8386c0df1514607054e7'
                  buttonText="Github"
                  style={{ marginTop: '8px' }}
                  onSuccess={onGitHubLoginSuccess}
                  onFailure={onGitHubLoginFailure}
                  redirectUri={'http://localhost:3000/modules'}
                />
              </div>
              <div className="transition-all duration-300 flex items-center justify-center flex-col border-[1px] border-[gray] p-2 rounded-md hover:bg-gray-300 w-[105.77px] h-[105.77px]">
                <button onClick={() => connectWallet()} className="w-full h-full flex justify-center items-center">
                  <Image className="w-[60px] h-[60px]" width={50} height={50} src={PolkadotImage} alt="Polkadot" />
                </button>
              </div>
            </div>
          </div>
        </Modal>
      }
    </header>
  );
}

export const getHeaderClasses = (position: number, height: number) => {
  if (position > height / 2) {
    return "rounded-b-lg shadow-lg mx-5";
  }

  return "";
};
