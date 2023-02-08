import React from "react";
import Head from "next/head";

type Props = {
    title: string;
    description?: string;
};

function HeadComponent({
    title,
    description = "A decentralised video / live streaming platform powered by livepeer network",
}: Props) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.png" />
        </Head>
    );
}
export default HeadComponent;
