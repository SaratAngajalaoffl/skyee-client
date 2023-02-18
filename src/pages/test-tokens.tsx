import ButtonComponent from "@/components/buttons/ButtonComponent";
import { useWalletContext } from "@/components/contexts/WalletContext";
import HeadComponent from "@/components/head/HeadComponent";
import TextField from "@/components/input/TextField";
import ConnectWalletWarningModal from "@/components/modals/ConnectWalletWarningModal";
import { ethers } from "ethers";
import { useCallback, useState } from "react";

import classes from "./TestMint.module.scss";

const TestTokensPage = () => {
    const { skyToken, updateWeb3, account } = useWalletContext();

    const [amount, setAmount] = useState<string>("");

    const handleMint = useCallback(async () => {
        if (!skyToken) return;

        const tx = await skyToken.mintTestTokens(
            account,
            ethers.utils.parseEther(amount)
        );

        await tx.wait();

        await updateWeb3();

        alert("Tokens Minted");
    }, [amount]);

    return (
        <>
            <HeadComponent title="Skyee - Get Test Tokens" />
            <ConnectWalletWarningModal />

            <div className={classes.main}>
                <div className={classes.margin}>
                    <TextField
                        value={amount.toString() || "0"}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className={classes.margin}>
                    <ButtonComponent title="Mint $SKY" onClick={handleMint} />
                </div>
            </div>
        </>
    );
};

export default TestTokensPage;
