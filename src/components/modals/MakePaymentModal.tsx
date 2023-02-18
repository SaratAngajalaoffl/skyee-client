import ButtonComponent from "../buttons/ButtonComponent";
import { useWalletContext } from "../contexts/WalletContext";
import { VideoRecord } from "types/pocketbase-types";
import { ethers } from "ethers";

import classes from "./MakePaymentModal.module.scss";
import { useCallback } from "react";
import { userCollection } from "@/utils/pocketbase";
import { useRouter } from "next/router";

type MakePaymentModalProps = {
    video: VideoRecord;
    setPaid: (newVal: boolean) => void;
};

const MakePaymentModal = ({ video, setPaid }: MakePaymentModalProps) => {
    const { account, skyToken, updateWeb3 } = useWalletContext();

    const router = useRouter();

    const makePayment = useCallback(async () => {
        if (!skyToken) return;

        try {
            const user = await userCollection.getOne(video.uploader);

            let tx = await skyToken.transfer(
                user.address,
                ethers.utils.parseEther(video.price?.toString() || "0")
            );

            await tx.wait();

            await updateWeb3();

            setPaid(true);
        } catch (err) {
            console.log({ err });
            router.replace("/");
        }
    }, [router, skyToken, video, setPaid, updateWeb3]);

    if (!account) return <></>;

    return (
        <div className={classes.main}>
            <div className={classes.inner_container}>
                <div className="txt-ctx-em-lg">
                    Please make a payment of {video.price} $SKY!
                </div>
                <ButtonComponent
                    title={`Pay ${video.price} $SKY`}
                    onClick={makePayment}
                    filled
                />
            </div>
        </div>
    );
};

export default MakePaymentModal;
