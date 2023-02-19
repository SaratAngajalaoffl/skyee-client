import Image from "next/image";
import Link from "next/link";
import { Record } from "pocketbase";
import { VideoRecord } from "types/pocketbase-types";
import Blockies from "react-blockies";

import classes from "./VideoHorizontalCard.module.scss";

export type VideoVerticalCardProps = {
    video: VideoRecord & Record;
};

const VideoHorizontalCard = ({ video }: VideoVerticalCardProps) => {
    return (
        <Link href={`/video/${video.id}`} className={classes.main}>
            <div className={classes.image}>
                <Image src={video.thumbnail} alt="thumbnail" fill />
            </div>
            <div className={classes.video_details}>
                <div className={classes.text_details}>
                    <h2 className={`txt-fg-nm-sm ${classes.title}`}>
                        {video.title}
                    </h2>
                    <h4 className={`txt-fg-nm-xs ${classes.description}`}>
                        {video.description}
                    </h4>
                    <div className={`${classes.price}`}>
                        <Blockies
                            seed={video.uploader}
                            className={classes.avatar}
                        />

                        <p className={`txt-fg-nm-xs`}>
                            Price: {video.price} $SKY
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default VideoHorizontalCard;
