import { AiOutlineWarning } from "react-icons/ai";
import ButtonComponent from "../buttons/ButtonComponent";

import { useWalletContext } from "../contexts/WalletContext";

import classes from "./ConnectWalletWarningModal.module.scss";

type ConnectWalletWarningModalProps = {};

const ConnectWalletWarningModal = ({}: ConnectWalletWarningModalProps) => {
    const { account, updateWeb3 } = useWalletContext();


    if (account && account.length === 42) return <></>;

    return (
        <div className={classes.main}>
            <div className={classes.inner_container}>
                <AiOutlineWarning size="128px" color="#c3688b" />
                <div className="txt-ctx-em-lg">
                    Please connect your wallet to proceed!
                </div>
                <ButtonComponent title="Connect Wallet" onClick={updateWeb3} filled />
            </div>
        </div>
    );
};

export default ConnectWalletWarningModal;
