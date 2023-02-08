import WalletContextProvider from "../contexts/WalletContext";
import NavbarComponent from "../navbar/NavbarComponent";
import {
    createReactClient,
    LivepeerConfig,
    studioProvider,
} from "@livepeer/react";

const client = createReactClient({
    provider: studioProvider({
        apiKey: "9566791e-34a2-4cdf-8751-9e347d6ae92f",
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
