import { userCollection } from "@/utils/pocketbase";
import { ethers } from "ethers";
import { Record } from "pocketbase";
import { createContext, useCallback, useContext, useState } from "react";

type IWalletContext = {
    isLoading: boolean;
    account: string | null;
    ethersProvider: ethers.providers.Web3Provider | null;
    updateWeb3: () => any;
    user: Record | null;
};

const walletContext = createContext<IWalletContext>({
    isLoading: false,
    account: null,
    ethersProvider: null,
    updateWeb3: () => {},
    user: null,
});

type Props = {
    children: JSX.Element;
};

const WalletContextProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ethersProvider, setEthersProvider] =
        useState<ethers.providers.Web3Provider | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [user, setUser] = useState<Record | null>(null);

    const updateWeb3 = useCallback(async () => {
        setIsLoading(true);

        if (!window?.ethereum) return;

        const provider = new ethers.providers.Web3Provider(window?.ethereum);

        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();

        const address = await signer.getAddress();

        if (address) {
            try {
                const userRecord = await userCollection.getFirstListItem(
                    `address = "${address}"`
                );

                setUser(userRecord);
            } catch (err) {
                try {
                    const userRecord = await userCollection.create({
                        address,
                    });

                    setUser(userRecord);
                } catch (err1) {
                    console.log({ err1 });
                }
            }

            setAccount(address);
            setEthersProvider(provider);
        }

        setIsLoading(false);
    }, []);

    return (
        <walletContext.Provider
            value={{ isLoading, account, ethersProvider, updateWeb3, user }}
        >
            {children}
            <div></div>
        </walletContext.Provider>
    );
};

export const useWalletContext = () => {
    const data = useContext(walletContext);

    return data;
};

export default WalletContextProvider;
