import Image from "next/image";
import { Record } from "pocketbase";
import { VideoRecord } from "types/pocketbase-types";
import { Player } from "@livepeer/react";
import { BigNumber, ethers } from "ethers";

import VideoHorizontalCard from "@/components/cards/VideoHorizontalCard";
import HeadComponent from "@/components/head/HeadComponent";
import ConnectWalletWarningModal from "@/components/modals/ConnectWalletWarningModal";
import { pb_client, videoCollection } from "@/utils/pocketbase";

import classes from "./VideoPlayer.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useWalletContext } from "@/components/contexts/WalletContext";
import { useRouter } from "next/router";

type PosterImageProps = {
    thumbnail?: string;
};

type VideoPlayerProps = {
    videoDetails: VideoRecord & Record;
    suggestions: (VideoRecord & Record)[];
};

const DEFAULT_THUMBNAIL = "";

const PLAYER_THEME = {
    borderStyles: {},
    colors: {
        accent: "#C3688B",
    },
    space: {
        controlsBottomMarginX: "10px",
        controlsBottomMarginY: "5px",
        controlsTopMarginX: "15px",
        controlsTopMarginY: "10px",
    },
    radii: {
        containerBorderRadius: "0px",
    },
};

const PosterImage = ({ thumbnail }: PosterImageProps) => {
    return <Image src={thumbnail || DEFAULT_THUMBNAIL} alt="thumbnail" fill />;
};

const VideoPlayer = ({ videoDetails, suggestions }: VideoPlayerProps) => {
    const { user, ethersProvider, updateWeb3, skyToken, account } =
        useWalletContext();
    const [video, setVideo] = useState<(VideoRecord & Record) | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [txPending, setTxPending] = useState<boolean>(false);

    const {
        query: { vid },
    } = useRouter();

    useEffect(() => {
        setVideo(null);

        console.log("Video Details Changes");
    }, [videoDetails]);

    console.log({ video });

    useEffect(() => {
        (async () => {
            try {
                if (
                    txPending ||
                    !!video ||
                    !user ||
                    !videoDetails ||
                    !ethersProvider ||
                    !skyToken ||
                    !account
                )
                    return;

                setLoading(true);

                const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;

                const allowance: BigNumber = await skyToken.allowance(
                    account,
                    adminAddress
                );

                if (
                    allowance.lt(
                        ethers.utils.parseEther(
                            (videoDetails.price || 0).toString()
                        )
                    )
                )
                    return setTxPending(false);

                setTxPending(true);
                const message = JSON.stringify({
                    userId: user.id,
                    videoId: videoDetails.id,
                    nonce: user.nonce,
                });

                const signer = ethersProvider.getSigner();
                const signature = await signer?.signMessage(message);

                const response = await axios.post("/api/get-video", {
                    signature,
                    videoId: videoDetails.id,
                    userId: user.id,
                });

                await updateWeb3();

                setVideo(response.data.video);
                setLoading(false);
                setTxPending(false);
            } catch (err) {
                console.log({ err });
            }
        })();
    }, [
        video,
        user,
        txPending,
        skyToken,
        ethersProvider,
        vid,
        videoDetails,
        account,
        updateWeb3,
    ]);

    return (
        <>
            <ConnectWalletWarningModal />
            <HeadComponent title={`${videoDetails.title}`} />
            <div className={classes.main}>
                <div className={classes.left_container}>
                    <div className={classes.player_container}>
                        {video ? (
                            <>
                                <div style={{ display: "none" }}>
                                    {video.playback_id}
                                </div>
                                <Player
                                    title={video.title}
                                    playbackId={video.playback_id}
                                    poster={
                                        <PosterImage
                                            thumbnail={videoDetails.thumbnail}
                                        />
                                    }
                                    theme={PLAYER_THEME}
                                    objectFit="cover"
                                />
                            </>
                        ) : (
                            <Player
                                title={videoDetails.title}
                                playbackId=""
                                poster={
                                    <PosterImage
                                        thumbnail={videoDetails.thumbnail}
                                    />
                                }
                                theme={PLAYER_THEME}
                                objectFit="cover"
                                showLoadingSpinner={loading}
                            />
                        )}
                    </div>
                    <div className={classes.video_desc}>
                        <h1 className="txt-fg-em-lg">{videoDetails.title}</h1>
                        <h6 className="txt-fg-em-md">
                            {videoDetails.description}
                        </h6>
                    </div>
                </div>
                <div className={classes.suggestions_container}>
                    {suggestions.map((suggestion) => (
                        <VideoHorizontalCard
                            key={suggestion.id}
                            video={suggestion}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async ({
    params,
}: {
    params: { vid: string; uid: string };
}) => {
    const videoRecord = await videoCollection.getOne(params.vid);

    const suggestions = await videoCollection.getFullList(20, {
        filter: `id != "${params.vid}"`,
    });

    return {
        props: {
            videoDetails: {
                title: videoRecord.title,
                description: videoRecord.description,
                thumbnail: pb_client.getFileUrl(
                    videoRecord,
                    videoRecord.thumbnail
                ),
                price: videoRecord.price,
                id: videoRecord.id,
                uploader: videoRecord.uploader,
            },
            suggestions: suggestions.map((item) => ({
                id: item.id,
                title: item.title,
                thumbnail: pb_client.getFileUrl(item, item.thumbnail),
                description: item.description,
                uploader: item.uploader,
            })),
        },
    };
};

export default VideoPlayer;
