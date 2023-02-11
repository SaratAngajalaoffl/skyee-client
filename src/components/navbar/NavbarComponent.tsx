import React, { useCallback, useEffect, useState } from "react";
import ButtonComponent from "../buttons/ButtonComponent";
import { useWalletContext } from "../contexts/WalletContext";

import loaderIcon from "@/assets/images/loader-bg.gif";
import metamaskIcon from "@/assets/images/metamask.png";

import classes from "./NavbarComponent.module.scss";
import DropdownComponent, { DropdownItem } from "../dropdown/DropdownComponent";
import { useRouter } from "next/router";
import Logo from "../logo/Logo";

const NavbarComponent = () => {
    const { isLoading, account, updateWeb3 } = useWalletContext();

    const [isDropdownActive, setIsDropdownActive] = useState<boolean>(false);

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

        return () => setIsDropdownActive((oldval) => !oldval);
    }, [isLoading, account, updateWeb3]);

    const items: DropdownItem[] = [
        {
            action: "/profile/create",
            title: "Create Video",
        },
        {
            action: "/video/1",
            title: "View Video",
        },
        {
            action: "/profile/videos",
            title: "My Videos",
        },
        {
            action: "/profile/account",
            title: "My Account",
        },
    ];

    useEffect(() => {
        setIsDropdownActive(false);
    }, [router]);

    return (
        <div className={classes.main}>
            <Logo />
            <div className={classes.actions}>
                <div className={classes.dropdown_parent}>
                    <ButtonComponent
                        title={getButton1Ctx()}
                        icon={getButton1Icon()}
                        onClick={getButton1Action()}
                        filled={getButton1Fill()}
                        width="lg"
                    />
                    {isDropdownActive && <DropdownComponent items={items} />}
                </div>
            </div>
        </div>
    );
};

export default NavbarComponent;
