import React, { useCallback } from "react";
import ButtonComponent from "../buttons/ButtonComponent";
import { useWalletContext } from "../contexts/WalletContext";

import loaderIcon from "@/assets/images/loader-bg.gif";
import metamaskIcon from "@/assets/images/metamask.png";

import classes from "./NavbarComponent.module.scss";

const NavbarComponent = () => {
    const { isInitiating, account } = useWalletContext();

    const getButton1Ctx = useCallback(() => {
        if (isInitiating) return undefined;

        if (!account) return "Connect Wallet";

        return account.substring(0, 7) + "...";
    }, [account, isInitiating]);

    const getButton1Icon = useCallback(() => {
        if (isInitiating) return loaderIcon;

        if (!account) return undefined;

        return metamaskIcon;
    }, [account, isInitiating]);

    const getButton1Fill = useCallback((): boolean => {
        if (isInitiating) return true;

        if (!account) return true;

        return false;
    }, [isInitiating, account]);

    return (
        <div className={classes.main}>
            <p className={`txt-ctx-em-lg`}>Skyee</p>
            <div className={classes.actions}>
                <ButtonComponent
                    title={getButton1Ctx()}
                    icon={getButton1Icon()}
                    onClick={() => {}}
                    filled={getButton1Fill()}
                    width="lg"
                />
            </div>
        </div>
    );
};

export default NavbarComponent;
