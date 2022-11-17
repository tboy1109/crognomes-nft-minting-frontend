export const configVars = {
    mode: "regular",
    rpcNetwork: {
        rpcUrl: "https://cronos-testnet-3.crypto.org:8545/",
        chainId: 338,
        chainIdHex: "0x152",
        chainName: "Cronos Testnet",
        chainType: "mainnet",
        nativeCurrency: {
            name: "CRO",
            symbol: "CRO",
            decimals: 18,
        },
        blockExplorerUrl: "https://cronos.crypto.org/explorer/testnet3/",
    },
    rpcNetwork_mainnet: {
        rpcUrl: "https://evm-cronos.crypto.org/",
        chainId: 25,
        chainIdHex: "0x19",
        chainName: "Cronos Mainnet Beta",
        chainType: "mainnet",
        nativeCurrency: {
            name: "CRO",
            symbol: "CRO",
            decimals: 18,
        },
        blockExplorerUrl: "https://cronos.crypto.org/explorer/",
    }
};