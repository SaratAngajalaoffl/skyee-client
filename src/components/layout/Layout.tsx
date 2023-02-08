import NavbarComponent from "../navbar/NavbarComponent";

type Props = {
    children: JSX.Element;
};

const Layout = ({ children }: Props) => {
    return (
        <main>
            <NavbarComponent />
            {children}
        </main>
    );
};

export default Layout;
