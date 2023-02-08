import Image, { StaticImageData } from "next/image";
import { MouseEventHandler } from "react";
import classes from "./ButtonComponent.module.scss";

type Props = {
    width?: "sm" | "lg";
    filled?: boolean;
    icon?: StaticImageData;
    title?: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const ButtonComponent = ({
    width = "sm",
    filled = false,
    icon,
    title,
    onClick,
}: Props) => {
    return (
        <button
            className={`${classes.main} ${
                width === "lg" ? classes.lg : classes.sm
            } ${filled ? classes.fill : classes.outline} ${
                filled ? "txt-bg-nm-sm" : "txt-ctx-nm-sm"
            }`}
            onClick={onClick}
        >
            {icon && (<Image src={icon} alt="icon" width={32} height={32} className={classes.icon}/>)}
            {title && title}
        </button>
    );
};

export default ButtonComponent;
