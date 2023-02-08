import { MouseEventHandler } from "react";
import classes from "./ButtonComponent.module.scss";

type Props = {
    width?: "sm" | "lg";
    filled?: boolean;
    title: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

const ButtonComponent = ({
    width = "sm",
    filled = false,
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
            {title}
        </button>
    );
};

export default ButtonComponent;
