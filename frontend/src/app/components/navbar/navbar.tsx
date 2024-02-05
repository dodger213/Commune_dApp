'use client';

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { loadStripe } from "@stripe/stripe-js";

import classNames from "classnames";

import type { MenuProps } from 'antd';
import { Dropdown, Modal, Space, Select } from 'antd';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSendTransaction, useContractWrite } from 'wagmi'
import { parseEther, parseUnits } from 'viem'

import axios from "axios";

import ActiveLink from "../active-link";
import ThemeToggler from "../theme-toggler/theme-toggler";

import { saveTransaction } from "@/store/action/transaction.record.action";

import * as  erc20ContractABI from '../../../services/token_abi.json';
import MetaMaskImage from '../../../../public/svg/metamask.svg'
import StripeImage from '../../../../public/img/frontpage/stripe.png'

import classes from './navbar.module.css';
import { acceptableChains, tokenAddresses } from "@/config";

const paymentMethods: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <span rel="noopener noreferrer" className="flex items-center">
                Pay with Stripe
                <Image src={StripeImage} alt="stripeImage" width={24} height={24} className="rounded-md ml-auto" />
            </span>
        ),
    },
    {
        key: '2',
        label: (
            <span rel="noopener noreferrer" className="flex items-center" >
                Pay with Wallet
                <Image src={MetaMaskImage} alt="MetaMaskImage" width={24} height={24} className="rounded-md ml-2" />
            </span>
        ),
    },
]

function DiscordIcon() {
    return (
        <svg style={{ marginLeft: '10px' }} fill="currentColor" width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36">
            <g id="图层_2" data-name="图层 2">
                <g id="Discord_Logos" data-name="Discord Logos">
                    <g id="Discord_Logo_-_Large_-_White" data-name="Discord Logo - Large - White">
                        <path className="cls-1" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"></path>
                    </g>
                </g>
            </g>
        </svg>
    );
}

function TwitterIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "15px" }} width="24" height="24" fill="currentColor" viewBox="0 0 248 204">
            <path fill="#1d9bf0" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"></path>
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg style={{ marginLeft: "15px" }} width="24" height="24" fill="currentColor" viewBox="3 3 18 18">
            <title>GitHub</title>
            <path d="M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z"></path>
        </svg>
    );
}

export default function NavigationBar() {
    const [isShowWalletPaymentModal, setIsShowWalletPaymentModal] = useState(false)
    const [destinationAddress, setDestinationAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [tokenType, setTokenType] = useState('eth')
    const [selectedChain, setSelectedChain] = useState<string>('ethereum')

    const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
    const { abi: erc20ABI } = erc20ContractABI

    const router = useRouter();
    // const dispatch = useDispatch<any>()

    const handleClickPayButton = async () => {
        try {
            let amount = 1;
            const stripe = await asyncStripe;
            const res = await fetch("/api/stripe/session", {
                method: "POST",
                body: JSON.stringify({
                    amount,
                }),
                headers: { "Content-Type": "application/json" },
            });

            const { sessionId } = await res.json();

            const result = await stripe?.redirectToCheckout({ sessionId });

            // Check if 'error' exists in the result
            if (result?.error) {
                router.push("/error");
            }
        } catch (err) {
            router.push("/error");
        }
    };

    const handleMetaMaskPayment = () => {
        setIsShowWalletPaymentModal(true)
    }

    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === '1') {
            handleClickPayButton()
        }
        if (key === '2') {
            handleMetaMaskPayment()
        }
    };

    const handleWalletPaymentModalOpen = () => {
        setIsShowWalletPaymentModal(false)
    }

    const handleChange = (value: string) => {
        setTokenType(value)
    };

    const { data: hash, sendTransaction } = useSendTransaction()

    //This Function must be used in Client side.
    const createBTCTx = async (toAddress: string, value: number, env: string, fromAddress: string) => {
        try {
            // const { toAddress, value, env, fromAddress } = data;
            const valueInSatoshi = value * 100000000;
            // console.log(valueInSatoshi);
            // console.log("Vivek bhai ",toAddress, value, env, fromAddress);
            if (!fromAddress || !toAddress || !value || !env) {
                return {
                    code: 0,
                    message: "invalid/insufficient parameters"
                }
            }
            let url;
            if (env == 'testnet') {
                url = 'https://api.blockcypher.com/v1/btc/test3/txs/new'
            }
            else if (env == 'mainnet') {
                url = 'https://api.blockcypher.com/v1/btc/main/txs/new'
            }
            else {
                return {
                    code: 0,
                    message: 'Invalid env'
                }
            }
            let data = JSON.stringify({
                "inputs": [
                    {
                        "addresses": [
                            `${fromAddress}`  /* "n1TKu4ZX7vkyjfvo7RCbjeUZB6Zub8N3fN" */
                        ]
                    }
                ],
                "outputs": [
                    {
                        "addresses": [
                            `${toAddress}` /* "2NCY42y4mbvJCxhd7gcCroBEvVh1dXkbPzA"
 */                    ],
                        "value": valueInSatoshi
                    }
                ]
            });

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.blockcypher.com/v1/btc/test3/txs/new',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            const response = await axios.request(config)
                .then((response) => {
                    // console.log("Tushar",JSON.stringify(response.data));
                    return response;
                })
                .catch((error) => {
                    console.log(error);
                });
            // console.log(response.status);
            if (response?.status != 201) {
                return {
                    code: 0,
                    message: response?.data?.error
                }
            }
            return {
                code: 1,
                result: response.data
            }

        } catch (error) {
            console.log('error generating btc tx', error);
            return {
                code: 0,
                message: error,
            };
        }
    }

    const { data: txHashUSDT, write: paywithUSDT } = useContractWrite({
        address: tokenAddresses[selectedChain || 'ethereum'].usdt,
        abi: erc20ABI,
        functionName: 'transfer'
    })

    const { data: txHashUSDC, write: paywithUSDC } = useContractWrite({
        address: tokenAddresses[selectedChain || 'ethereum'].usdc,
        abi: erc20ABI,
        functionName: 'transfer'
    })

    const handlePayWithWallet = () => {
        if(!acceptableChains.includes(selectedChain)) {
            return;
        }

        if (tokenType === 'eth') {
            if (selectedChain !== 'ethereum') {
                window.alert('Please change your chain to Ethereum')
            } else {
                sendTransaction({ to: destinationAddress, value: parseEther(amount) })
            }
        }
        if (tokenType === 'matic') {
            if (selectedChain !== 'Polygon') {
                window.alert('Please change your chain to Polygon')
            } else {
                sendTransaction({ to: destinationAddress, value: parseEther(amount) })
            }
        }
        if (tokenType === 'usdt') {
            paywithUSDT({ args: [destinationAddress, parseUnits(amount, 6)] });
        }
        if (tokenType === 'usdc') {
            paywithUSDC({ args: [destinationAddress, parseUnits(amount, 6)] });
        }
    }

    if (hash || txHashUSDT || txHashUSDC) {
        let selectedHash = hash || txHashUSDT || txHashUSDC;

        if (selectedHash) {
            saveTransaction(tokenType, parseFloat(amount), destinationAddress, selectedHash.hash);
        }

    }

    return (
        <nav aria-label="Main" className={classes.navbar}>
            <div className={classes.items}>
                <Link className={classes.brand} href="/">
                    <div className={classes.logo}>
                        <img style={{ width: "auto", height: "3.7rem", marginRight: "-0.25rem" }} src="/svg/commune.svg" alt="My Site Logo" />
                    </div>
                    <b className="dark:text-white dark:hover:text-[#25c2a0]">commune</b>
                </Link>
                <ActiveLink
                    activeClassName={classes.activeModules}
                    className={
                        classNames(
                            'dark:text-white dark:hover:text-[#dc4b4b] dark:active:text-[#dc4b4b]',
                            classes.item
                        )
                    }
                    href="/modules"
                >
                    🚀 Modules
                </ActiveLink>
                <ActiveLink
                    activeClassName={classes.activeDocs}
                    className={
                        classNames(
                            'dark:text-white dark:hover:text-[#6a4bdc] dark:active:text-[#6a4bdc]',
                            classes.item
                        )
                    }
                    href="/docs/introduction"
                >
                    📚 Docs
                </ActiveLink>
                <Link
                    className={
                        classNames(
                            'dark:text-white dark:hover:text-[#d2d522] dark:active:text-[#d2d522]',
                            classes.item
                        )
                    }
                    href="https://ai-secure.github.io/DMLW2022/assets/papers/7.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    📄 Whitepaper
                </Link>
                <ActiveLink
                    activeClassName={classes.active}
                    className={
                        classNames(
                            'dark:text-white dark:hover:text-[#25c2a0] dark:active:text-[#25c2a0]',
                            classes.item
                        )
                    }
                    href="/telemetry"
                >
                    ⛓️ Telemetry
                </ActiveLink>
                <ActiveLink
                    activeClassName={classes.active}
                    className={
                        classNames(
                            'dark:text-white dark:hover:text-[#25c2a0] dark:active:text-[#25c2a0]',
                            classes.item
                        )
                    }
                    href="/exchanges"
                >
                    💱  Exchanges
                </ActiveLink>
                <Link
                    className={
                        classNames(
                            'dark:text-white dark:hover:text-[#25c2a0] dark:active:text-[#25c2a0]',
                            classes.item
                        )
                    }
                    href="https://comchat.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    🥂  ComChat
                </Link>

                <Dropdown menu={{ items: paymentMethods, onClick }}>
                    <Space>
                        <ActiveLink
                            activeClassName={classes.active}
                            className={
                                classNames(
                                    'dark:text-white dark:hover:text-[#25c2a0] dark:active:text-[#25c2a0]',
                                    classes.item
                                )
                            }
                            href="#"
                        >
                            💰  Payment
                        </ActiveLink>
                    </Space>
                </Dropdown>

            </div>
            <div className={classNames('dark:text-white', classes.items, classes.itemsRight )}>
                <Link
                    className={classNames('dark:hover:text-[#25c2a0] dark:active:text-[#25c2a0]', classes.link)}
                    href="/docs/next/Introduction"
                >
                    🚀 v0.0.0
                </Link>

                <div className={classNames(classes.dropdown, 'z-[9999]')}>
                    <Link className={classes.link} href="#" aria-haspopup="true" aria-expanded="false" role="button" >🔗 Community</Link>
                    <ul className={classNames(classes.dropdownMenu, 'dark:bg-white dark:text-black w-32')}>
                        <li>
                            <Link
                                className={classNames(classes.dropdownLink)}
                                href="https://discord.gg/A8JGkZ9Dmm"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                                    <span>Discord</span>
                                    <DiscordIcon />
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={classes.dropdownLink}
                                href="https://twitter.com/communeaidotorg"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                                    <span>Twitter</span>
                                    <TwitterIcon />
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={classes.dropdownLink}
                                href="https://github.com/commune-ai"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                                    <span>Github</span>
                                    <GitHubIcon />
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={classes.themeTogglerWrapper}>
                    <ThemeToggler />
                </div>
            </div>

            {
                isShowWalletPaymentModal
                &&
                <Modal open={isShowWalletPaymentModal} onCancel={handleWalletPaymentModalOpen} footer={null} >

                    <div className="flex flex-col">
                        <label className="mt-2">Receiver:</label>
                        <input
                            value={destinationAddress}
                            onChange={({ target: { value } }) => setDestinationAddress(value)}
                            style={{ padding: '0.3rem' }}
                            className="mt-2 !border-2 !border-gray-400 rounded"
                            placeholder="Please input wallet address"
                        />
                        <div className="flex items-center mt-4">
                            <label style={{ marginRight: '0.3rem' }}>TOKEN:</label>
                            <Space wrap>
                                <Select
                                    defaultValue="ETH"
                                    style={{ width: 120 }}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'eth', label: 'ETH' },
                                        { value: 'matic', label: 'MATIC' },
                                        { value: 'usdt', label: 'USDT' },
                                        { value: 'usdc', label: 'USDC' },
                                        // { value: 'bitcoin', label: 'BTC' },
                                    ]}
                                />
                            </Space>
                            <label className="ml-auto mr-2">Amount:</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={({ target: { value } }) => setAmount(value)}
                                style={{ padding: '0.3rem' }}
                                placeholder="0.00"
                                className="!border-2 !border-gray-400 rounded"
                            />
                        </div>

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
                                setSelectedChain(chain?.name?.toLowerCase() || '');
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
                                                    <div className='flex items-center justify-center mt-3 bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white hover:text-white font-sans font-semibold px-2 py-2 hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer' onClick={openConnectModal}>
                                                        <button type="button">
                                                            Connect Wallet
                                                        </button>
                                                        <Image src={MetaMaskImage} alt='login with Metamask' width={32} height={32} className='cursor-pointer ml-3' />
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
                                                <div style={{ display: 'flex', gap: 12 }} className='flex items-center justify-between mt-4'>
                                                    <button
                                                        onClick={openChainModal}
                                                        style={{ display: 'flex', alignItems: 'center' }}
                                                        type="button"
                                                        className="uppercase"
                                                    >
                                                        {chain.hasIcon && (
                                                            <div
                                                                style={{
                                                                    background: chain.iconBackground,
                                                                    width: 24,
                                                                    height: 24,
                                                                    borderRadius: 999,
                                                                    overflow: 'hidden',
                                                                    marginRight: 4,
                                                                }}
                                                            >
                                                                {chain.iconUrl && (
                                                                    <img
                                                                        alt={chain.name ?? 'Chain icon'}
                                                                        src={chain.iconUrl}
                                                                        style={{ width: 24, height: 24 }}
                                                                    />
                                                                )}
                                                            </div>
                                                        )}
                                                        {chain.name}
                                                    </button>

                                                    <button onClick={openAccountModal} type="button">
                                                        {`${account.address.substring(0, 8)}...${account.address.substring(0, 8)}`}
                                                    </button>

                                                    <button type="button" style={{ color: 'darkcyan' }} className="!text-black border-blue-400 border-2 p-2 rounded-full" onClick={handlePayWithWallet}>
                                                        Pay with Wallet
                                                    </button>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                );
                            }}
                        </ConnectButton.Custom>
                    </div>
                </Modal>
            }
        </nav>
    );
}
