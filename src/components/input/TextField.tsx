import { ChangeEventHandler } from "react";
import classes from "./TextField.module.scss";

export type TextFieldProps = {
    placeholder?: string;
    label?: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    size?: "sm" | "lg" | "fill";
    inputClasses?: string;
    containerClasses?: string;
};

function TextField({
    placeholder,
    label,
    value,
    onChange,
    size = "lg",
    inputClasses,
    containerClasses,
}: TextFieldProps) {
    return (
        <label
            className={`${classes.label} txt-fg-em-md ${
                size === "sm"
                    ? classes.sm
                    : size === "fill"
                    ? classes.fill
                    : classes.lg
            } ${containerClasses}`}
        >
            {label}
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${classes.input} ${inputClasses}`}
            />
        </label>
    );
}

export default TextField;
