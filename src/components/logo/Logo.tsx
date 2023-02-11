import Link from "next/link";
import React from "react";

import classes from "./Logo.module.scss";

type Props = {};

const Logo = ({}: Props) => {
    return <Link href="/" className={`txt-ctx-em-lg ${classes.logo}`}>Skyee</Link>;
};

export default Logo;
