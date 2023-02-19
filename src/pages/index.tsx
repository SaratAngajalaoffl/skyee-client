import VideoVerticalCard from "@/components/cards/VideoVerticalCard";
import HeadComponent from "@/components/head/HeadComponent";
import { pb_client, videoCollection } from "@/utils/pocketbase";
import { Record } from "pocketbase";
import { VideoRecord } from "types/pocketbase-types";

import classes from "./Home.module.scss";

type HomeProps = {
    videos: (VideoRecord & Record)[];
};

export default function Home({ videos }: HomeProps) {
    return (
        <>
            <HeadComponent title="Skyee - Home" />
            <div className={classes.main}>
                {videos.map((video) => (
                    <VideoVerticalCard key={video.id} video={video} />
                ))}
            </div>
        </>
    );
}

export const getServerSideProps = async () => {
    const videoRecords = await videoCollection.getFullList(200, {
        sort: "-created",
    });

    return {
        props: {
            videos: videoRecords.map((record) => ({
                id: record.id,
                title: record.title,
                description: record.description,
                thumbnail: pb_client.getFileUrl(record, record.thumbnail),
                uploader: record.uploader,
                price: record.price
            })),
        },
    };
};
