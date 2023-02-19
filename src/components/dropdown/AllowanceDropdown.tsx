import { ethers } from "ethers";
import { useCallback, useState } from "react";
import ButtonComponent from "../buttons/ButtonComponent";
import { useWalletContext } from "../contexts/WalletContext";
import TextField from "../input/TextField";

import classes from "./AllowanceDropdown.module.scss";

const AllowanceDropdown = () => {
    const [allowance, setAllowance] = useState<string>("0");

    const { skyToken, balance, allowance: currAllowance } = useWalletContext();

    const handleSetAllowance = useCallback(async () => {
        if (!skyToken) return;

        const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

        const tx = await skyToken.approve(
            adminAddress,
            ethers.utils.parseEther(allowance)
        );

        await tx.wait();
    }, [skyToken, allowance]);

    return (
        <div className={classes.dropdown_main}>
            <h1 className={`txt-ctx-nm-sm ${classes.balance}`}>
                Balance: {ethers.utils.formatEther(balance)} $SKY
            </h1>

            <h1 className={`txt-ctx-nm-sm ${classes.balance}`}>
                Allowance: {ethers.utils.formatEther(currAllowance)} $SKY
            </h1>

            <TextField
                value={allowance}
                onChange={(e) =>
                    setAllowance(parseFloat(e.target.value || "0").toString())
                }
                size="fill"
            />

            <div className={classes.flex} />

            <ButtonComponent
                title="Set Allowance"
                onClick={handleSetAllowance}
                filled
            />
        </div>
    );
};

export default AllowanceDropdown;
