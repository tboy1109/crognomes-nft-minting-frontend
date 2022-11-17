import { ethers } from "ethers";
import { DeFiWeb3Connector } from "deficonnect";
import * as config from "../config/config";

export const connect = async () => {
  try {
    const connector = new DeFiWeb3Connector({
      supportedChainIds: [config.configVars.rpcNetwork_mainnet.chainId],
      rpc: {
        [config.configVars.rpcNetwork_mainnet.chainId]:
          config.configVars.rpcNetwork_mainnet.rpcUrl,
      },
      pollingInterval: 15000,
    });
    await connector.activate();
    const provider = await connector.getProvider();
    const web3Provider = new ethers.providers.Web3Provider(provider);
    if (
      !(parseInt(provider.chainId) === config.configVars.rpcNetwork_mainnet.chainId)
    ) {
      window.alert(
        "Switch your Wallet to blockchain network " +
        config.configVars.rpcNetwork_mainnet.chainName
      );
      return null;
    }

    // connector.on("session_update", utils.reloadApp);
    // connector.on("Web3ReactDeactivate", utils.reloadApp);
    // connector.on("Web3ReactUpdate", utils.reloadApp);

    return {
      walletProviderName: "defiwallet",
      address: (await web3Provider.listAccounts())[0],
      browserWeb3Provider: web3Provider,
      serverWeb3Provider: new ethers.providers.JsonRpcProvider(
        config.configVars.rpcNetwork_mainnet.rpcUrl
      ),
      wcProvider: provider,
      wcConnector: connector,
      connected: true,
      chainId: provider.chainId,
    };
  } catch (e) {
    window.alert(e);
    return null;
  }
};
