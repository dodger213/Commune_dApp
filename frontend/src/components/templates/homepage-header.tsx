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
  const [isShowAuthModalOpen, setIsShowAuthModalOpen] = useState(false);
  const [isShowSubstrateConnectModalOpen, setIsShowSubstrateConnectModalOpen] =
    useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShowSubstrateAuth, setIsShowSubstrateAuth] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef<any>(null);
  const [headerHeight, setHeaderHeight] = useState(20);

  const [api, setApi] = useState<ApiPromise | null>(null);
  const [chainInfo, setChainInfo] = useState("");
  const [nodeName, setNodeName] = useState("");

  // typeWriter effect
  // give me the context of this whole useEffect
  useEffect(() => {
    if (index === words.length) return; // if end of words, return
    // if subIndex is equal to the length of the word + 1 and index is not the last word and not reverse
    if (
      subIndex === words[index].length + 1 &&
      index !== words.length - 1 &&
      !reverse
    ) {
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
    if (index === words.length - 1) setIndex(() => 0);
    // if reverse is true, subIndex is not 0 and index is not the last word
    // if reverse is false, subIndex is not the length of the word and index is not the last word
    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 75, 25),
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 250);
    if (index === words.length) return;

    return () => clearTimeout(timeout2);
  }, [blink]);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (headerRef?.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current]);

  const onGitHubLoginSuccess = (response: any) => {
    setIsShowAuthModalOpen(false);
    const accessToken = response.code;
    const getUserInfo = async (accessToken: string) => {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const userInfo = await response.json();
        setIsLoggedIn(true);
      } else {
        console.error("Failed to fetch user information from GitHub API");
      }
    };
    getUserInfo(accessToken);
  };
  
  const onGitHubLoginFailure = (response: any) => {
    console.log("------the data from github-----failed-----", response);
  };
  
  const connectWallet = async () => {
    try {
        await web3Enable('Commune AI');
        const accounts = await web3Accounts();
        const provider = new WsProvider('wss://rpc.polkadot.io');
        const polkadotAPI = await ApiPromise.create({ provider });
        const address = accounts[0].address;
        const data = await polkadotAPI.query.system.account(address);
        setIsShowAuthModalOpen(false);
      } catch (error) {
        console.error('Error connecting to wallet:', error);
    }
  };

  // useEffect(() => {
  //   const connectToSubstrate = async () => {
  //     const provider = new WsProvider('wss://rpc.polkadot.io');
  //     const substrateApi = await ApiPromise.create({ provider });
  //     setApi(substrateApi);
  //   };

  //   connectToSubstrate();
  // }, []);

//   const connectToSubstrate = async () => {
//     const provider = new WsProvider("wss://rpc.polkadot.io");
//     const substrateApi = await ApiPromise.create({ provider });
//     setApi(substrateApi);
//   };

//   const getChainInfo = async () => {
//     if (api) {
//       const chain = await api.rpc.system.chain();
//       setChainInfo(chain.toString());
//       const nodeName = await api.rpc.system.name();
//       setNodeName(nodeName.toString());
//       console.log(`Connected to chain ${chain} using ${nodeName}`);
//     }
//   };



//   useEffect(() => {
//     getChainInfo();
//   }, [api]);

//   const getAccountBalance = async () => {
//     try {
//       const accountInfo = await api?.query.system.account(address);
//       setIsLoggedIn(true);

//       // if (accountInfo?.isSome) {
//       //   const { nonce, data: balance } = accountInfo.unwrap();

//       //   console.log('Account Nonce:', nonce.toNumber());
//       //   console.log('Account Balance:', balance.free.toString());

//       //   setBalance(balance.free.toString());
//       // } else {
//       //   console.error('Account information not available for the provided address');
//       // }
//     } catch (error) {
//       console.error("Error getting account balance:", error);
//     }
//   };

//   const handleLogin = async () => {
//     if (!api || !address) {
//       window.alert("Substrate API not connected or address not provided");
//       setIsShowSubstrateAuth(false);
//       return;
//     }

//     // Fetch account balance as an example
//     getAccountBalance();
//     setIsShowSubstrateAuth(false);
//   };

//   const handleShowSubstrateAuth = () => {
//     setIsShowSubstrateAuth(true);
//   };

  return (
    <header
      ref={headerRef}
      className={` dark:bg-[#161616] p-[4rem] py-32 text-center overflow-hidden ${getHeaderClasses(scrollPosition, headerHeight)} duration-500`}
    >
      <img
        src="gif/logo/CubesShufflingGIF.gif"
        alt="Commune Logo"
        className="block sm:hidden"
      />
      <div className="px-10 py-5">
        <div className="flex lg:flex-row flex-col h-1/2">
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
            <div className=" w-auto sm:w-[710px] sm:h-[250px] ">
              <h1 className=" text-4xl sm:text-6xl sm:pb-3 dark:text-white">
                {TITLE}
              </h1>
              <div className="hidden sm:block">
                <p className="hero__subtitle text-xl sm:text-4xl dark:text-white">
                  {TAGLINE}
                  <br />
                  <span
                    className={`hero__subtitle text-4xl ${colour[index]} font-semibold mb-5`}
                  >{`${words[index].substring(0, subIndex)}${blink ? "|" : ""}`}</span>
                </p>
              </div>
            </div>
            <div className="w-30 h-10">
              <div
                className=" bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans
                  font-semibold justify-center px-2 py-2  cursor-pointer"
                onClick={() => setIsShowAuthModalOpen(true)}
              >
                Get Started
              </div>
            </div>
          </div>
          <div className="hidden sm:block w-full lg:w-1/2 h-full lg:-mr-44 ">
            <img src="gif/logo/commune.gif" alt="Commune Logo" className="" />
          </div>
        </div>
      </div>

      {/* {isShowSubstrateConnectModalOpen && (
        <Modal
          open={isShowSubstrateConnectModalOpen}
          onCancel={() => setIsShowSubstrateConnectModalOpen(false)}
          footer={null}
          width={500}
        >
          <button onClick={getChainInfo}>Get Chain Info</button>
        </Modal>
      )} */}

      {isShowAuthModalOpen && (
        <Modal
          open={isShowAuthModalOpen}
          onCancel={() => setIsShowAuthModalOpen(false)}
          footer={null}
          width={500}
        >
          <div className="flex items-center justify-center">
            <span
              style={{
                fontWeight: "500",
                alignItems: "center",
                display: "flex",
                fontSize: "2rem",
              }}
            >
              Connect to Commune AI
            </span>
          </div>

          <div className="flex items-center justify-evenly mt-14 mb-14 flex-col">
            <div className="flex w-full items-center justify-evenly cursor-pointer">
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
                  const ready = mounted && authenticationStatus !== "loading";
                  ready && account && chain && setIsLoggedIn(true);
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === "authenticated");

                  return (
                    <div
                      {...(!ready && {
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <div
                              className="flex items-center justify-center hover:bg-gray-300 p-2 w-[105.77px] h-[105.77px] rounded-md"
                              style={{
                                flexDirection: "column",
                                border: "1px solid gray",
                              }}
                              onClick={openConnectModal}
                            >
                              <Image
                                src={MetaMaskImage}
                                alt="login with Metamask"
                                width={50}
                                height={50}
                                className="cursor-pointer mb-1"
                              />
                              <button type="button">Metamask</button>
                            </div>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button
                              onClick={openChainModal}
                              type="button"
                              style={{
                                boxShadow: "rgb(0 0 0 / 98%) 3px 3px 3px 3px",
                              }}
                            >
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div
                            style={{ display: "flex", gap: 12 }}
                            className="flex items-center flex-col justify-center"
                          >
                            <button
                              onClick={openChainModal}
                              style={{ display: "flex", alignItems: "center" }}
                              type="button"
                            >
                              {chain.hasIcon && (
                                <div
                                  style={{
                                    background: chain.iconBackground,
                                    width: 12,
                                    height: 12,
                                    borderRadius: 999,
                                    overflow: "hidden",
                                    marginRight: 4,
                                  }}
                                >
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? "Chain icon"}
                                      src={chain.iconUrl}
                                      style={{ width: 12, height: 12 }}
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </button>

                            <button type="button" style={{ color: "darkcyan" }}>
                              Connected
                            </button>

                            <button onClick={openAccountModal} type="button">
                              {account.displayName}
                              {account.displayBalance
                                ? ` (${account.displayBalance})`
                                : ""}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>

              <div className="transition-all duration-300 flex items-center justify-center flex-col border-[1px] border-[gray] p-2 rounded-md hover:bg-gray-300 w-[105.77px] h-[105.77px]">
                <Image
                  src={GithubImage}
                  alt="login with Github"
                  width={50}
                  height={50}
                  className="cursor-pointer mb-1"
                />
                <GitHubLogin
                  clientId="8386c0df1514607054e7"
                  buttonText="Github"
                  style={{ marginTop: "8px" }}
                  onSuccess={onGitHubLoginSuccess}
                  onFailure={onGitHubLoginFailure}
                  redirectUri={"http://localhost:3000/modules"}
                />
              </div>
              <div className="transition-all duration-300 flex items-center justify-center flex-col border-[1px] border-[gray] p-2 rounded-md hover:bg-gray-300 w-[105.77px] h-[105.77px]">
                <button onClick={connectWallet} className="w-full h-full flex justify-center items-center">
                  <Image className="w-[60px] h-[60px]" width={50} height={50} src={PolkadotImage} alt="Polkadot" />
                </button>
              </div>
            </div>

            
            {/* <div
              className="flex flex-col justify-center items-center mt-4 p-[20px] rounded-md "
              style={{ flexDirection: "column", border: "1px solid gray" }}
            >
              {isShowSubstrateAuth ? (
                <>
                  <button
                    onClick={connectToSubstrate}
                    className="bg-blue-400 rounded-lg shadow-lg hover:shadow-2xl text-center
                     hover:bg-blue-500 duration-200 text-white font-sans font-semibold justify-center p-2 cursor-pointer"
                  >
                    Connect to Substrate
                  </button>
                  {chainInfo && nodeName && (
                    <div className="flex items-center justify-evenly mt-4">
                      Connected to chain{" "}
                      <span className="text-cyan-500 italic px-[5px]">
                        {chainInfo}
                      </span>{" "}
                      using
                      <span className="text-cyan-500 italic px-[5px]">
                        {nodeName}
                      </span>
                    </div>
                  )}
                  <div className="mt-[20px]">
                    <label htmlFor="substrate-address">
                      Enter Substrate Address:
                    </label>
                    <input
                      id="substrate-address"
                      type="text"
                      className="p-2 w-full outline-none bg-white border-[1px] border-[gray] rounded-md"
                      value={address}
                      onChange={({ target: { value } }) => setAddress(value)}
                    />
                  </div>
                  <button
                    onClick={handleLogin}
                    className="bg-blue-400 rounded-lg shadow-lg hover:shadow-2xl text-center 
                      hover:bg-blue-500 duration-200 text-white font-sans font-semibold justify-center p-2 cursor-pointer mt-2"
                  >
                    Login
                  </button>
                  {balance !== null && <p>Account Balance: {balance}</p>}
                </>
              ) : (
                <div
                  className="flex flex-col items-center justify-center cursor-pointer h-[105.77px]"
                  onClick={handleShowSubstrateAuth}
                >
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src="/svg/polkadot.svg"
                    alt="My Site Logo"
                    className="mb-1"
                  />
                  <span>Substrate</span>
                </div>
              )} 
            </div> */}
          </div>
        </Modal>
      )}
    </header>
  );
}

export const getHeaderClasses = (position: number, height: number) => {
  if (position > height / 2) {
    return "rounded-b-lg shadow-lg mx-5";
  }

  return "";
};
