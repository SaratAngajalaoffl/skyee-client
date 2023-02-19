import WalletContextProvider from "../contexts/WalletContext";
import NavbarComponent from "../navbar/NavbarComponent";
import {
    createReactClient,
    LivepeerConfig,
    studioProvider,
} from "@livepeer/react";

const client = createReactClient({
    provider: studioProvider({
        apiKey: process.env.NEXT_PUBLIC_LIVEPEER_KEY || "",
    }),
});

type Props = {
    children: JSX.Element;
};

const Layout = ({ children }: Props) => {
    return (
        <LivepeerConfig client={client}>
            <WalletContextProvider>
                <main>
                    <NavbarComponent />
                    {children}
                </main>
            </WalletContextProvider>
        </LivepeerConfig>
    );
};

export default Layout;
