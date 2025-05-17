import '@nomicfoundation/hardhat-chai-matchers'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-verify'
import '@typechain/hardhat'

import 'hardhat-deploy'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import 'hardhat-storage-layout'
import 'solidity-docgen'

import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || './.env'
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) })

if (process.env.NODE_ENV != 'build') {
	require('./tasks')
}

const accounts = {
	mnemonic: process.env.MNEMONIC || 'test test test test test test test test test test test test',
}

const config = {
	solidity: {
		compilers: [
			{
				version: '0.8.20',
				settings: {},
			},
		],
	},
	namedAccounts: {
		deployer: 0,
		simpleERC20Beneficiary: 1
	},
	networks: {
		hardhat: {
			accounts,
			gas: 'auto',
			gasPrice: 'auto',
			gasMultiplier: 1.3,
			chainId: 1337,
		},
		'optopia-sepolia': {
			url: 'https://rpc-testnet.optopia.ai/',
			accounts
		},
		'optopia': {
			url: 'https://rpc-mainnet-2.optopia.ai',
			accounts,
			zksync: false,
		},
	},
	etherscan: {
		apiKey: {
			'optopia-sepolia': 'YCD2MN31FUJ15DQD4ANRH5FVQV2V66VQ3K',
			'optopia': 'YCD2MN31FUJ15DQD4ANRH5FVQV2V66VQ3K'
		},
		customChains: [
			{
				network: 'optopia-sepolia',
				chainId: 62049,
				urls: {
					apiURL: 'https://scan-testnet.optopia.ai/api',
					browserURL: 'https://scan-testnet.optopia.ai/'
				}
			},
			{
				network: 'optopia',
				chainId: 62050,
				urls: {
					apiURL: 'https://scan.optopia.ai/api',
					browserURL: 'https://scan.optopia.ai/'
				}
			}
		]
	},
	paths: {
		deploy: 'deploy',
		artifacts: 'artifacts',
		cache: 'cache',
		sources: 'contracts',
		tests: 'test'
	},
	gasReporter: {
		currency: 'USD',
		gasPrice: 100,
		enabled: process.env.REPORT_GAS ? true : false,
		coinmarketcap: process.env.COINMARKETCAP_API_KEY,
		maxMethodDiff: 10,
	},
	docgen: {
		templates: './hbs',
		root: './',
		theme: 'markdown',
		sourcesDir: './contracts',
		pages: 'files',
		outputDir: './docs'
	},
	typechain: {
		outDir: 'types',
		target: 'ethers-v6',
	},
	mocha: {
		timeout: 0,
	}
}

export default config
