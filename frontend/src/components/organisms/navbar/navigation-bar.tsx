import { Fragment, useState, useEffect } from 'react'
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ApiPromise, WsProvider } from '@polkadot/api';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { loadStripe } from "@stripe/stripe-js";
import { Modal, Space, Select } from 'antd';
import { IoSettingsSharp } from "react-icons/io5";
import { parseEther } from 'viem'
import { useSendTransaction, useContractWrite } from 'wagmi'
import classes from './navigation-bar.module.css';
import LogoImage from '../../../../public/gif/logo/CubesShufflingGIF.gif'
import StripeImage from '../../../../public/img/frontpage/stripe.png'
import MetaMaskImage from '../../../../public/svg/metamask.svg'
import * as  erc20ContractABI from '../../../services/token_abi.json';
import DiscordIcon from "@/components/atoms/discord-icon";
import GitHubIcon from "@/components/atoms/github-icon";
import TwitterIcon from "@/components/atoms/twitter-icon";
import ThemeToggler from "@/components/templates/theme-toggler";
import { saveTransaction } from "@/store/action/transaction.record.action";


const user = {
	name: 'Tom Cook',
	email: 'tom@example.com',
}

const navigation = [
	{ name: '🚀Modules', href: '/modules', current: false },
	{ name: '⛓Telemetry', href: '/telemetry', current: false },
	// { name: '🥂ComChat', href: 'https://comchat.io/', current: false },
	// { name: '💻ComfyUILauncher', href: 'https://huggingface.co/spaces/subbytech/comfyui-launcher/', current: false },
	// { name: '💱Comwallet', href: 'https://comwallet.io/', current: false },
	// { name: 'Bittensor', href: '/bittensor', current: false },
	// { name: 'Staking', href: '/staking', current: false },
	{ name: '📚Docs', href: '/docs/introduction', current: false },
	{ name: '📄Whitepaper', href: 'https://ai-secure.github.io/DMLW2022/assets/papers/7.pdf' },
]

const community = [
	{ name: 'Discord', href: 'https://discord.gg/communeai' },
	{ name: 'Twitter', href: 'https://twitter.com/communeaidotorg' },
	{ name: 'Github', href: 'https://github.com/commune-ai' },
]

// const userNavigation = [
// 	{ name: 'Profile', href: '/profile' },
// 	{ name: 'Settings', href: '#' },
// ]

// const items: MenuProps['items'] = [
// 	{
// 		key: '1',
// 		label: (
// 			<span rel="noopener noreferrer" className="flex items-center">
// 				Pay with Stripe
// 				<Image src={StripeImage} alt="stripeImage" width={24} height={24} className="rounded-md ml-auto" />
// 			</span>
// 		),
// 	},
// 	{
// 		key: '2',
// 		label: (
// 			<span rel="noopener noreferrer" className="flex items-center" >
// 				Pay with Wallet
// 				<Image src={MetaMaskImage} alt="MetaMaskImage" width={24} height={24} className="rounded-md ml-2" />
// 			</span>
// 		),
// 	},
// ]

export default function NavigationBar() {
	const [isShowWalletPaymentModal, setIsShowWalletPaymentModal] = useState(false)
	const [destinationAddress, setDestinationAddress] = useState('')
	const [amount, setAmount] = useState('')
	const [tokenType, setTokenType] = useState('')
	const [selectedChain, setSelectedChain] = useState('')
	const [isShowConnectWithSubstrateModalOpen, setIsShowConnectWithSubstrateModalOpen] = useState(false)
	const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');
	const { abi: erc20ABI } = erc20ContractABI
	const router = useRouter();

	const handleClickPayButton = async () => {
		try {
			const amount = 1;
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

	// const onClick: MenuProps['onClick'] = ({ key }) => {
	// 	if (key === '1') {
	// 		handleClickPayButton()
	// 	}
	// 	if (key === '2') {
	// 		handleMetaMaskPayment()
	// 	}
	// };

	const handleWalletPaymentModalOpen = () => {
		setIsShowWalletPaymentModal(false)
	}

	const handleChange = (value: string) => {
		setTokenType(value)
	};

	const { data: hash, sendTransaction } = useSendTransaction()

	const { data: txHashUSDT, write: paywithUSDT } = useContractWrite({
		address: '0x28B3071bE7A6E4B3bE2b36D78a29b6e4DbBdDb74',
		abi: erc20ABI,
		functionName: 'transfer'
	})

	const { data: txHashUSDC, write: paywithUSDC } = useContractWrite({
		address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
		abi: erc20ABI,
		functionName: 'transfer'
	})

	const handlePayWithWallet = () => {
		if (tokenType === 'eth') {
			sendTransaction({ to: destinationAddress, value: parseEther(amount) })
		}
		if (tokenType === 'matic') {
			if (selectedChain !== 'Polygon') {
				window.alert('Please change your chain to Polygon')
			} else {
				sendTransaction({ to: destinationAddress, value: parseEther(amount) })
			}
		}
		if (tokenType === 'usdt') {
			paywithUSDT({ args: [destinationAddress, amount] });
		}
		if (tokenType === 'usdc') {
			paywithUSDC({ args: [destinationAddress, amount] });
		}
	}

	if (hash || txHashUSDT || txHashUSDC) {
		const selectedHash = hash || txHashUSDT || txHashUSDC;
		if (selectedHash) {
			saveTransaction(tokenType, parseFloat(amount), destinationAddress, selectedHash.hash);
		}
	}

	const handleConnectWithSubstrateModalCancel = () => {
		setIsShowConnectWithSubstrateModalOpen(false)
	}
	const [api, setApi] = useState<ApiPromise | null>(null);
	const [chainInfo, setChainInfo] = useState('');
	const [nodeName, setNodeName] = useState('');

	useEffect(() => {
		const connectToSubstrate = async () => {
			const provider = new WsProvider('wss://rpc.polkadot.io');
			const substrateApi = await ApiPromise.create({ provider });
			setApi(substrateApi);
		};
		connectToSubstrate();
	}, []);

	const getChainInfo = async () => {
		if (api) {
			const chain = await api.rpc.system.chain();
			if (chain) {
				setChainInfo(chain?.toString())
			}
			const nodeName = await api.rpc.system.name();
			if (nodeName) {
				setNodeName(nodeName?.toString())
			}
			console.log(`Connected to chain ${chain} using ${nodeName}`);
		}
	};

	return (
		<>
			<div className="min-h-full">
				<Disclosure as="nav" className="dark:bg-gray-900 border-b-2 border-slate-500 shadow-md">
					{({ open }) => (
						<>
							<div className="mx-auto px-4 lg:px-8">
								<div className="flex h-16 items-center justify-between">
									<div className="flex items-center">
										<Link className={classes.brand} href="/">
											<Image
												style={{ width: "auto", height: "4rem", marginRight: "-0.25rem" }}
												src="/gif/logo/commune.gif"
												alt="Commune Logo"
												width={64}
												height={64}
											/>
										</Link>
										<div className="hidden xl:block">
											<div className="flex">
												{navigation.map((item) => (
													<a
														key={item.name}
														href={item.href}
														className={classNames(classes.link, 'dark:text-white dark:hover:text-[#25c2a0] p-0 lg:pl-4 md:text-xl')}
														aria-current={item.current ? 'page' : undefined}
													>
														<span className='flex items-center justify-center'>
															{item.name === 'Bittensor' && <Image src='/img/frontpage/bittensor.jpg' alt='bittensor' width={25} height={10} className='mr-1' />}
															{item.name === 'Staking' && <Image src='/img/frontpage/staking.jpg' alt='staking' width={25} height={10} className='mr-1 rounded-md' />}
															{item.name}
														</span>
													</a>
												))}
											</div>
										</div>
									</div>
									{/* <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Commune AI</span></h1> */}
									<div className="hidden md:block">
										<div className="flex items-center">
											<Menu as="div" className="flex relative ml-3">

												<Menu.Button className={classNames(classes.link, 'dark:text-white dark:hover:text-[#25c2a0] p-0 md:text-xl')} aria-haspopup="true" aria-expanded="false" role="button" >
													🔗Community
												</Menu.Button>

												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="dark:bg-[#242556] dark:text-white absolute right-0 z-10 mt-8 w-39 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
														<Menu.Item>
															<Link
																className={classes.dropdownLink}
																href="https://discord.gg/communeai"
																target="_blank"
																rel="noopener noreferrer"
															>
																<div style={{ display: "flex", alignItems: "center", }}>
																	<span><DiscordIcon /></span>
																	<span className="ml-1 mr-2">Discord</span>
																</div>
															</Link>
														</Menu.Item>
														<Menu.Item>
															<Link
																className={classes.dropdownLink}
																href="https://twitter.com/communeaidotorg"
																target="_blank"
																rel="noopener noreferrer"
															>
																<div style={{ display: "flex", alignItems: "center", }}>
																	<TwitterIcon />
																	<span className="ml-1 mr-2">Twitter</span>
																</div>
															</Link>
														</Menu.Item>
														<Menu.Item>
															<Link
																className={classes.dropdownLink}
																href="https://github.com/commune-ai"
																target="_blank"
																rel="noopener noreferrer"
															>
																<div style={{ display: "flex", alignItems: "center", }}>
																	<GitHubIcon />
																	<span className="ml-1 mr-2">Github</span>
																</div>
															</Link>
														</Menu.Item>
													</Menu.Items>
												</Transition>

											</Menu>

											<Menu as="div" className="flex relative ml-3">
												<div>
													<Menu.Button style={{ marginLeft: '0.35rem' }} className={classNames(classes.link, 'dark:text-white dark:hover:text-[#25c2a0] p-0 md:text-[18px]')}>💰Payment</Menu.Button>
												</div>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="dark:bg-[#242556] dark:text-white absolute right-0 z-10 mt-8 w-48 origin-top-right rounded-md bg-white py-1 px-5 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
														<Menu.Item>
															<button rel="noopener noreferrer" onClick={handleClickPayButton} className="flex items-center" >
																Pay with Stripe
																<Image src={StripeImage} alt="stripeImage" width={24} height={24} className="rounded-md ml-3" />
															</button>

														</Menu.Item>
														<Menu.Item>
															<button rel="noopener noreferrer" onClick={handleMetaMaskPayment} className="flex items-center" >
																Pay with Wallet
																<Image src={MetaMaskImage} alt="MetaMaskImage" width={24} height={24} className="rounded-md ml-2" />
															</button>

														</Menu.Item>
													</Menu.Items>
												</Transition>

											</Menu>

											{/* <Dropdown menu={{ items, onClick }}>
												<Space>
													<button style={{ marginLeft: '0.35rem' }} className={classNames(classes.link, 'dark:text-white dark:hover:text-[#25c2a0] p-0 md:text-[18px]')}>💰Payment</button>
												</Space>
											</Dropdown> */}

											<Menu as="div" className="flex relative ml-3 mr-3 mt-2">
												<div>
													<Menu.Button className={classNames(classes.link, 'dark:text-white dark:hover:text-[#25c2a0] p-0 md:text-xl')} aria-haspopup="true" aria-expanded="false" role="button" >
														<IoSettingsSharp />
													</Menu.Button>
												</div>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="dark:bg-[#242556] dark:text-white absolute right-0 z-10 mt-6 w-39 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
														<Menu.Item>
															<Link
																className={classes.dropdownLink}
																href="/profile"
																target="_blank"
																rel="noopener noreferrer"
															>
																<div style={{ display: "flex", alignItems: "center", }}>
																	<span className="ml-1 mr-2">Profile</span>
																</div>
															</Link>
														</Menu.Item>
														<Menu.Item>
															<Link
																className={classes.dropdownLink}
																href="#"
																target="_blank"
																rel="noopener noreferrer"
															>
																<div style={{ display: "flex", alignItems: "center", }}>
																	<span className="ml-1 mr-2">Settings</span>
																</div>
															</Link>
														</Menu.Item>
													</Menu.Items>
												</Transition>

											</Menu>

											{/* <Menu as="div" className="mx-3">
												<div>
													<Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
														<span className="absolute -inset-1.5" />
														<span className="sr-only">Open user menu</span>
														<Image className="h-8 w-8 rounded-full bg-white" src={LogoImage} alt="" />
													</Menu.Button>
												</div>

												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="dark:bg-[#242556] dark:text-white absolute right-10 z-10 mt-2 w-39 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
														{
															userNavigation.map((item) => (
																<Menu.Item key={item.name}>
																	{({ active }) => (
																		<a
																			href={item.href}
																			className={classNames(
																				active ? 'bg-gray-100' : '',
																				'block px-4 py-2 text-sm text-gray-700'
																			)}
																		>
																			{item.name}
																		</a>
																	)}
																</Menu.Item>
															))
														}
													</Menu.Items>
												</Transition>

											</Menu> */}

											{/* <div className={classes.themeTogglerWrapper} style={{ marginLeft: '0.1rem' }}> */}
											<ThemeToggler />
											{/* </div> */}
										</div>
									</div>
									<div className="flex xl:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button
											className="
												relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 
												text-gray-400 hover:text-[#25c2a0] focus:outline-none focus:ring-2 
												focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800
											"
										>
											<span className="absolute -inset-0.5" />
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XMarkIcon className="block h-6 w-6" aria-hidden="true" />
											) : (
												<Bars3Icon className="block h-6 w-6" aria-hidden="true" />
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>

							<Disclosure.Panel className="xl:hidden">
								<div className="space-y-1 pb-3 pt-2 px-3">
									{navigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="a"
											href={item.href}
											className={classNames(
												item.current ? 'bg-gray-900 text-white' : 'dark:text-white hover:text-[#25c2a0]',
												'block rounded-md px-3 py-2', classes.link
											)}
											aria-current={item.current ? 'page' : undefined}
										>
											{item.name}
										</Disclosure.Button>
									))}
								</div>
								<div className="border-t border-gray-700 pb-3 pt-4">
									<div className="flex items-center px-5">
										<Image className="h-10 w-10 rounded-full bg-white" src={LogoImage} alt="" />
										<div className="ml-3">
											<div className="text-base font-medium leading-none dark:text-white">{user.name}</div>
											<div className="text-sm font-medium leading-none dark:text-white">{user.email}</div>
										</div>
										<div className={classNames(classes.themeTogglerWrapper, 'ml-auto')}>
											<ThemeToggler />
										</div>
									</div>
									<div className="mt-3 space-y-1 px-2">
										{community.map((item) => (
											<Disclosure.Button
												key={item.name}
												as="a"
												href={item.href}
												target='_blank'
												className="block rounded-md px-3 py-2 dark:text-white text-lg"
											>
												{item.name}
											</Disclosure.Button>
										))}
									</div>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
			{
				isShowConnectWithSubstrateModalOpen
				&&
				<Modal open={isShowConnectWithSubstrateModalOpen} onCancel={handleConnectWithSubstrateModalCancel} footer={null} >
					<div className="flex flex-col">
						<button
							onClick={getChainInfo}
							className="
								w-1/2 mx-auto bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl text-center hover:bg-blue-600 
								duration-200 text-white hover:text-white font-sans font-semibold justify-center px-2 py-2 
								hover:border-blue-300 hover:border-2 hover:border-solid cursor-pointer
							"
						>
							Get Chain Info
						</button>
						{
							chainInfo && nodeName &&
							<div className="flex items-center justify-evenly mt-4">
								Connected to chain <span className="text-cyan-500">{chainInfo}</span> using <span className="text-cyan-500">{nodeName}</span>
							</div>
						}
					</div>
				</Modal>
			}
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
							className="mt-2"
							placeholder="Please input wallet address"
						/>
						<div className="flex items-center mt-4">
							<label style={{ marginRight: '0.3rem' }}>PayType:</label>
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
							<input type="number" value={amount} onChange={({ target: { value } }) => setAmount(value)} style={{ padding: '0.3rem' }} />
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
								setSelectedChain(chain?.name || '');
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
													<div
														className='
															flex items-center justify-center mt-3 bg-blue-700 rounded-lg shadow-lg 
															hover:shadow-2xl text-center hover:bg-blue-600 duration-200 text-white
															hover:text-white font-sans font-semibold px-2 py-2 hover:border-blue-300 
															hover:border-2 hover:border-solid cursor-pointer
														'
														onClick={openConnectModal}
													>
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
																		style={{ width: 12, height: 12 }}
																		width={12}
																		height={12}
																	/>
																)}
															</div>
														)}
														{chain.name}
													</button>
													<button type="button" style={{ color: 'darkcyan' }} onClick={handlePayWithWallet}>
														Pay with Wallet
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
				</Modal>
			}
		</>
	)
}
