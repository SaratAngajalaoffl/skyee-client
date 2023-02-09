import { ethers } from "ethers";
import {
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

type IWalletContext = {
    isLoading: boolean;
    account: string | null;
    ethersProvider: ethers.providers.Web3Provider | null;
    updateWeb3: () => any;
};

const walletContext = createContext<IWalletContext>({
    isLoading: false,
    account: null,
    ethersProvider: null,
    updateWeb3: () => {},
});

type Props = {
    children: JSX.Element;
};

const WalletContextProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ethersProvider, setEthersProvider] =
        useState<ethers.providers.Web3Provider | null>(null);
    const [account, setAccount] = useState<string | null>(null);

    const updateWeb3 = useCallback(async () => {
        setIsLoading(true);

        if (!window?.ethereum) return;

        const provider = new ethers.providers.Web3Provider(window?.ethereum);

        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();

        const address = await signer.getAddress();

        if (address) {
            setAccount(address);
            setEthersProvider(provider);
        }

        setIsLoading(false);
    }, []);

    return (
        <walletContext.Provider
            value={{ isLoading, account, ethersProvider, updateWeb3 }}
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
