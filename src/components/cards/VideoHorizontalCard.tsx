import Image from "next/image";
import Link from "next/link";
import { Record } from "pocketbase";
import { VideoRecord } from "types/pocketbase-types";
import Blockies from "react-blockies";

import classes from "./VideoHorizontalCard.module.scss";

export type VideoVerticalCardProps = {
    video: VideoRecord & Record;
};

const MAX_DESCRIPTION_LENGTH = 70;

const VideoHorizontalCard = ({ video }: VideoVerticalCardProps) => {
    return (
        <Link href={`/video/${video.id}`} className={classes.main}>
            <div className={classes.image}>
                <Image src={video.thumbnail} alt="thumbnail" fill />
            </div>
            <div className={classes.video_details}>
                <div className={classes.text_details}>
                    <h2 className="txt-fg-nm-sm">{video.title}</h2>
                    <h4
                        className={`txt-fg-nm-xs ${classes.description}`}
                    >{`${video.description?.substring(
                        0,
                        MAX_DESCRIPTION_LENGTH
                    )}${
                        video.description?.length &&
                        video.description.length > MAX_DESCRIPTION_LENGTH
                            ? "..."
                            : ""
                    }`}</h4>
                    <Blockies
                        seed={video.uploader}
                        className={classes.avatar}
                    />
                </div>
            </div>
        </Link>
    );
};

export default VideoHorizontalCard;
