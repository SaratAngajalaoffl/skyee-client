import VideoHorizontalCard from "@/components/cards/VideoHorizontalCard";
import HeadComponent from "@/components/head/HeadComponent";
import { pb_client, videoCollection } from "@/utils/pocketbase";
import { Player } from "@livepeer/react";
import Image from "next/image";
import { Record } from "pocketbase";
import { VideoRecord } from "types/pocketbase-types";

import classes from "./VideoPlayer.module.scss";

type PosterImageProps = {
    thumbnail?: string;
};

type VideoPlayerProps = {
    video: VideoRecord;
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

const VideoPlayer = ({ video, suggestions }: VideoPlayerProps) => {
    return (
        <>
            <HeadComponent title={`${video.title}`} />
            <div className={classes.main}>
                <div className={classes.player_container}>
                    <Player
                        title={video.title}
                        playbackId={video?.playback_id}
                        poster={<PosterImage thumbnail={video.thumbnail} />}
                        theme={PLAYER_THEME}
                        objectFit="cover"
                        priority
                    />
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
    params: { vid: string };
}) => {
    const videoRecord = await videoCollection.getOne(params.vid);

    const suggestions = await videoCollection.getFullList(20, {
        filter: `id != "${params.vid}"`,
    });

    return {
        props: {
            video: {
                playback_id: videoRecord.playback_id || "",
                title: videoRecord.title,
                thumbnail: pb_client.getFileUrl(
                    videoRecord,
                    videoRecord.thumbnail
                ),
            },
            suggestions: suggestions.map((item) => ({
                id: item.id,
                title: item.title,
                thumbnail: pb_client.getFileUrl(item, item.thumbnail),
                description: item.description,
                uploader: item.uploader
            })),
        },
    };
};

export default VideoPlayer;
