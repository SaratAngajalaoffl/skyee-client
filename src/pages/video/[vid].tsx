import { Player, useAsset } from "@livepeer/react";
import Image from "next/image";
import { useRouter } from "next/router";

import classes from "./VideoPlayer.module.scss";

const PosterImage = () => {
    return (
        <Image
            src="https://static-cse.canva.com/blob/1003136/1600w-wK95f3XNRaM.jpg"
            alt="thumbnail"
            fill
        />
    );
};

const VideoPlayer = () => {
    const router = useRouter();
    const { vid } = router.query;

    const { data: asset } = useAsset("83cfb58c-83ab-4d95-8d8f-f8faaba89850");

    return (
        <div className={classes.main}>
            <Player
                title="Agent 327: Operation Barbershop"
                playbackId={asset?.playbackId}
                poster={<PosterImage />}
                showPipButton
                objectFit="cover"
                priority
            />{" "}
        </div>
    );
};

export default VideoPlayer;
