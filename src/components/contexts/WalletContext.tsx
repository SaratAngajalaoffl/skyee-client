import { Provider } from "ethers";
import { createContext, useContext, useState } from "react";

type IWalletContext = {
    isInitiating: boolean;
};

const walletContext = createContext<IWalletContext>({
    isInitiating: true,
});

type Props = {
    children: JSX.Element;
};

const WalletContextProvider = ({ children }: Props) => {
    const [isInitiating, setIsInitiating] = useState<boolean>(true);
    const [ethersProvider, setEthersProvider] = useState<Provider | null>(null);
    const [account, setAccount] = useState<string | null>();

    return (
        <walletContext.Provider value={{ isInitiating }}>
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
