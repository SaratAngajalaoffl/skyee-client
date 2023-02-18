import { ethers } from "ethers";

export const getAdminWallet = () => {
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC || "");

    const provider = new ethers.providers.JsonRpcProvider(
        process.env.JSON_RPC_ENDPOINT || ""
    );

    return wallet.connect(provider);
};
