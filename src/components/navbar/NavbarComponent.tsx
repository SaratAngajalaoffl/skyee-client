import React from "react";
import ButtonComponent from "../buttons/ButtonComponent";
import { useWalletContext } from "../contexts/WalletContext";

import classes from "./NavbarComponent.module.scss";

const NavbarComponent = () => {
    const { isInitiating } = useWalletContext();

    return (
        <div className={classes.main}>
            <p className={`txt-ctx-em-lg`}>Skyee</p>
            <div className={classes.actions}>
                <ButtonComponent title="Connect Wallet" onClick={() => {}} filled width="lg"/>
            </div>
        </div>
    );
};

export default NavbarComponent;
