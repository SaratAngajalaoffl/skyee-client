import React, { useCallback, useEffect, useState } from "react";
import ButtonComponent from "../buttons/ButtonComponent";
import { useWalletContext } from "../contexts/WalletContext";
import { ethers } from "ethers";

import loaderIcon from "@/assets/images/loader-bg.gif";
import metamaskIcon from "@/assets/images/metamask.png";

import classes from "./NavbarComponent.module.scss";
import DropdownComponent, { DropdownItem } from "../dropdown/DropdownComponent";
import { useRouter } from "next/router";
import Logo from "../logo/Logo";
import AllowanceDropdown from "../dropdown/AllowanceDropdown";

const NavbarComponent = () => {
    const { isLoading, account, updateWeb3, balance } = useWalletContext();

    const [isAccountDropdownActive, setIsAccountDropdownActive] =
        useState<boolean>(false);
    const [isAllowanceDropdownActive, setIsAllowanceDropdownActive] =
        useState<boolean>(false);

    const router = useRouter();

    const getButton1Ctx = useCallback(() => {
        if (isLoading) return undefined;

        if (!account) return "Connect Wallet";

        return account.substring(0, 7) + "...";
    }, [account, isLoading]);

    const getButton1Icon = useCallback(() => {
        if (isLoading) return loaderIcon;

        if (!account) return undefined;

        return metamaskIcon;
    }, [account, isLoading]);

    const getButton1Fill = useCallback((): boolean => {
        if (isLoading) return true;

        if (!account) return true;

        return false;
    }, [isLoading, account]);

    const getButton1Action = useCallback((): (() => any) => {
        if (isLoading) return () => {};

        if (!account) return updateWeb3;

        return () => setIsAccountDropdownActive((oldval) => !oldval);
    }, [isLoading, account, updateWeb3]);

    const items: DropdownItem[] = [
        {
            action: "/profile/create",
            title: "Create Video",
        },
        {
            action: "/test-tokens",
            title: "Mint Test $SKY",
        },
    ];

    useEffect(() => {
        setIsAccountDropdownActive(false);
        setIsAllowanceDropdownActive(false);
    }, [router]);

    return (
        <div className={classes.main}>
            <Logo />
            <div className={classes.actions}>
                {account && (
                    <div className={classes.dropdown_parent}>
                        <ButtonComponent
                            title={`$SKY balance: ${ethers.utils.formatEther(
                                balance
                            )}`}
                            onClick={() =>
                                setIsAllowanceDropdownActive(
                                    (oldval) => !oldval
                                )
                            }
                            filled
                            width="lg"
                        />
                        {isAllowanceDropdownActive && (
                            <AllowanceDropdown />
                        )}
                    </div>
                )}
                <div className={classes.dropdown_parent}>
                    <ButtonComponent
                        title={getButton1Ctx()}
                        icon={getButton1Icon()}
                        onClick={getButton1Action()}
                        filled={getButton1Fill()}
                        width="lg"
                    />
                    {isAccountDropdownActive && (
                        <DropdownComponent items={items} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default NavbarComponent;
