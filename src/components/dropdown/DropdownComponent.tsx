import Link from "next/link";
import classes from "./DropdownComponent.module.scss";

export type DropdownItem = {
    title: string;
    action: string;
};

type Props = {
    items: DropdownItem[];
};

const DropdownComponent = ({ items }: Props) => {
    return (
        <div className={classes.dropdown}>
            {items.map((item) => (
                <Link
                    key={item.title}
                    className={`${classes.dropdown_item} txt-fg-nm-sm`}
                    href={item.action}
                >
                    {item.title}
                </Link>
            ))}
        </div>
    );
};

export default DropdownComponent;
