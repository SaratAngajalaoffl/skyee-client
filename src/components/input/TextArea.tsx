import { ChangeEventHandler } from "react";
import classes from "./TextArea.module.scss";

export type TextAreaProps = {
    placeholder?: string;
    label?: string;
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    size?: "sm" | "lg" | "fill";
    inputClasses?: string;
    containerClasses?: string;
};

function TextArea({
    placeholder,
    label,
    value,
    onChange,
    size = "lg",
    inputClasses,
    containerClasses,
}: TextAreaProps) {
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
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`${classes.input} ${inputClasses}`}
                rows={2}
            />
        </label>
    );
}

export default TextArea;
