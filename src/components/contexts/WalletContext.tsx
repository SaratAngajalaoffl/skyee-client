import { ethers } from "ethers";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

type IWalletContext = {
    isInitiating: boolean;
    account: string | null;
    ethersProvider: ethers.providers.Web3Provider | null;
};

const walletContext = createContext<IWalletContext>({
    isInitiating: true,
    account: null,
    ethersProvider: null,
});

type Props = {
    children: JSX.Element;
};

const WalletContextProvider = ({ children }: Props) => {
    const [isInitiating, setIsInitiating] = useState<boolean>(true);
    const [ethersProvider, setEthersProvider] =
        useState<ethers.providers.Web3Provider | null>(null);
    const [account, setAccount] = useState<string | null>(null);

    const updateWeb3 = useCallback(async () => {
        setIsInitiating(true);

        if (!window?.ethereum) return;

        const provider = new ethers.providers.Web3Provider(window?.ethereum);

        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();

        const address = await signer.getAddress();

        if (address) {
            setAccount(address);
            setEthersProvider(provider);
        }

        setIsInitiating(false);
    }, []);

    useEffect(() => {
        updateWeb3();
    }, [updateWeb3]);

    return (
        <walletContext.Provider
            value={{ isInitiating, account, ethersProvider }}
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
