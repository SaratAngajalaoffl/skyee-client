import { userCollection } from "@/utils/pocketbase";
import { Contract, ethers } from "ethers";
import { Record } from "pocketbase";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import token_abi from "@/artifacts/sky_artifact.json";

type IWalletContext = {
    isLoading: boolean;
    account: string | null;
    ethersProvider: ethers.providers.Web3Provider | null;
    updateWeb3: () => any;
    user: Record | null;
    balance: ethers.BigNumber;
    skyToken?: Contract;
};

type Props = {
    children: JSX.Element;
};

const ADMIN_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

const walletContext = createContext<IWalletContext>({
    isLoading: false,
    account: null,
    ethersProvider: null,
    updateWeb3: () => {},
    user: null,
    balance: ethers.BigNumber.from(0),
});

const WalletContextProvider = ({ children }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ethersProvider, setEthersProvider] =
        useState<ethers.providers.Web3Provider | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [user, setUser] = useState<Record | null>(null);
    const [balance, setBalance] = useState<ethers.BigNumber>(
        ethers.BigNumber.from(0)
    );
    const [allowance, setAllowance] = useState<ethers.BigNumber>(
        ethers.BigNumber.from(0)
    );
    const [skyToken, setSkyToken] = useState<Contract>();

    const checkWeb3 = useCallback(async () => {
        setIsLoading(true);

        if (!window?.ethereum) return;

        const provider = new ethers.providers.Web3Provider(window?.ethereum);

        setEthersProvider(provider);

        setIsLoading(false);
    }, []);

    const updateWeb3 = useCallback(async () => {
        setIsLoading(true);

        if (!window?.ethereum) return;

        const provider = new ethers.providers.Web3Provider(window?.ethereum);

        await provider.send("eth_requestAccounts", []);

        setEthersProvider(provider);

        setIsLoading(false);
    }, []);

    useEffect(() => {
        checkWeb3();
    }, [checkWeb3]);

    const updateUserAddress = useCallback(async () => {
        if (!ethersProvider) return;

        try {
            const signer = ethersProvider.getSigner();

            const address = await signer.getAddress();

            setAccount(address);
        } catch (err) {
            console.log(err);
        }
    }, [ethersProvider]);

    useEffect(() => {
        updateUserAddress();
    }, [updateUserAddress]);

    const updateUserRecord = useCallback(async () => {
        if (!account) return;

        try {
            const userRecord = await userCollection.getFirstListItem(
                `address = "${account}"`
            );

            setUser(userRecord);
        } catch (err) {
            try {
                const userRecord = await userCollection.create({
                    address: account,
                });

                setUser(userRecord);
            } catch (err1) {
                console.log({ err1 });
            }
        }
    }, [account]);

    useEffect(() => {
        updateUserRecord();
    }, [updateUserRecord]);

    const updateSkyContract = useCallback(() => {
        if (!ethersProvider) return;

        const signer = ethersProvider.getSigner();

        const skyToken = new Contract(
            process.env.NEXT_PUBLIC_SKY_TOKEN_ADDRESS || "",
            token_abi.abi,
            signer
        );

        setSkyToken(skyToken);
    }, [ethersProvider]);

    useEffect(() => {
        updateSkyContract();
    }, [updateSkyContract]);

    const updateBalance = useCallback(async () => {
        if (!skyToken || !account) return setBalance(ethers.BigNumber.from(0));

        const sky_balance = await skyToken.balanceOf(account);

        console.log({ sky_balance });

        setBalance(sky_balance);
    }, [skyToken, account]);

    useEffect(() => {
        updateBalance();
    }, [updateBalance]);

    const updateAllowance = useCallback(async () => {
        if (!skyToken || !account)
            return setAllowance(ethers.BigNumber.from(0));

        const sky_allowance = await skyToken.allowance(account, ADMIN_ADDRESS);

        setAllowance(sky_allowance);
    }, [skyToken, account]);

    useEffect(() => {
        updateAllowance();
    }, [updateAllowance]);

    return (
        <walletContext.Provider
            value={{
                isLoading,
                account,
                ethersProvider,
                updateWeb3,
                user,
                balance,
                skyToken,
            }}
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
