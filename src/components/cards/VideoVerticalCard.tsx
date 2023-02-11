import Image from "next/image";
import Link from "next/link";
import { Record } from "pocketbase";
import { VideoRecord } from "types/pocketbase-types";
import Blockies from "react-blockies";

import classes from "./VideoVerticalCard.module.scss";

export type VideoVerticalCardProps = {
    video: VideoRecord & Record;
};

const MAX_DESCRIPTION_LENGTH = 70;

const VideoVerticalCard = ({ video }: VideoVerticalCardProps) => {
    return (
        <Link href={`/video/${video.id}`} className={classes.main}>
            <div className={classes.image}>
                <Image src={video.thumbnail} alt="thumbnail" fill />
            </div>
            <div className={classes.video_details}>
                <Blockies seed={video.uploader} className={classes.avatar} />
                <div className={classes.text_details}>
                    <h2 className="txt-fg-em-md">{video.title}</h2>
                    <h4
                        className={`txt-fg-nm-sm ${classes.description}`}
                    >{`${video.description?.substring(0, MAX_DESCRIPTION_LENGTH)}${
                        video.description?.length &&
                        video.description.length > MAX_DESCRIPTION_LENGTH
                            ? "..."
                            : ""
                    }`}</h4>
                </div>
            </div>
        </Link>
    );
};

export default VideoVerticalCard;
