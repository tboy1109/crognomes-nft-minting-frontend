import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import * as config from "../config/config";

export const connect = async () => {
  try {
    localStorage.clear();
    const provider = new WalletConnectProvider({
      rpc: {
        [config.configVars.rpcNetwork_mainnet.chainId]:
          config.configVars.rpcNetwork_mainnet.rpcUrl,
      },
      chainId: config.configVars.rpcNetwork_mainnet.chainId,
    });
    await provider.enable();
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    if (!(provider.chainId === config.configVars.rpcNetwork_mainnet.chainId)) {
      window.alert(
        "Switch your Wallet to blockchain network " +
        config.configVars.rpcNetwork_mainnet.chainName
      );
      return null;
    }
    // provider.on("accountsChanged", utils.reloadApp);
    // provider.on("chainChanged", utils.reloadApp);
    // provider.on("disconnect", utils.reloadApp);
    return {
      walletProviderName: "walletconnect",
      address: (await ethersProvider.listAccounts())[0],
      browserWeb3Provider: ethersProvider,
      serverWeb3Provider: new ethers.providers.JsonRpcProvider(
        config.configVars.rpcNetwork_mainnet.rpcUrl
      ),
      wcProvider: provider,
      connected: true,
      chainId: provider.chainId,
    };
  } catch (e) {
    return null;
  }
};
