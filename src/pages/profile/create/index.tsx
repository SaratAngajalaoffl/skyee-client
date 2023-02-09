import { useEffect, useState } from "react";
import Image from "next/image";
import { FileUploader } from "react-drag-drop-files";
import ReactPlayer from "react-player";
import { useCreateAsset } from "@livepeer/react";

import uploadIcon from "@/assets/images/upload.png";
import HeadComponent from "@/components/head/HeadComponent";
import TextField from "@/components/input/TextField";
import TextArea from "@/components/input/TextArea";
import ButtonComponent from "@/components/buttons/ButtonComponent";

import classes from "./CreatePage.module.scss";
import { Circle } from "rc-progress";

const videoTypes = ["MP4"];
const thumbnailTypes = ["GIF", "PNG", "WEBP", "JPEG"];

const CreatePage = () => {
    const [video, setVideo] = useState<File | null>(null);
    const [thumbnail, setThumbail] = useState<File | null>(null);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    const {
        mutate: uploadVideoToLivePeer,
        data: assets,
        status,
        progress,
        error,
    } = useCreateAsset(
        video
            ? {
                  sources: [{ name: video.name, file: video }] as const,
              }
            : null
    );

    useEffect(() => {
        console.log({
            status,
            progress,
            error,
            assets,
        });
    }, [status, progress, error, assets]);

    const handleVideoDrop = (file: File) => {
        console.log(URL.createObjectURL(file));
        setVideo(file);
    };

    const handleThumbnailDrop = (file: File) => {
        console.log(URL.createObjectURL(file));
        setThumbail(file);
    };

    return (
        <>
            <HeadComponent title="Skyee - Upload Video" />
            <div className={classes.main}>
                {!video && (
                    <FileUploader
                        classes={classes.video_upload}
                        multiple={false}
                        handleChange={handleVideoDrop}
                        types={videoTypes}
                        label="Video upload"
                    >
                        <div className={classes.video_upload_area}>
                            <span
                                className={`txt-fg-em-md ${classes.upload_cta}`}
                            >
                                <Image
                                    src={uploadIcon}
                                    alt="upload"
                                    width={34}
                                    height={34}
                                    style={{ marginRight: 10 }}
                                />
                                Upload Video Here
                            </span>
                        </div>
                    </FileUploader>
                )}
                {video && status === "idle" && (
                    <div className={classes.video_details}>
                        <div className={classes.uploaded_video}>
                            <ReactPlayer
                                url={URL.createObjectURL(video)}
                                controls={true}
                            />
                        </div>
                        <div className={classes.details_form}>
                            <FileUploader
                                classes={classes.thumbnail_upload}
                                multiple={false}
                                handleChange={handleThumbnailDrop}
                                types={thumbnailTypes}
                                label="Thumbnail upload"
                            >
                                <div className={classes.thumbnail_upload_area}>
                                    {thumbnail ? (
                                        <Image
                                            src={URL.createObjectURL(thumbnail)}
                                            alt="thumbnail"
                                            fill
                                        />
                                    ) : (
                                        <span
                                            className={`txt-fg-em-md ${classes.upload_cta}`}
                                        >
                                            <Image
                                                src={uploadIcon}
                                                alt="upload"
                                                width={34}
                                                height={34}
                                                style={{ marginRight: 10 }}
                                            />
                                            Upload Thumbnail Here
                                        </span>
                                    )}
                                </div>
                            </FileUploader>

                            <TextField
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                size="fill"
                                label="Video Title"
                                containerClasses={`${classes.video_title_input}`}
                            />

                            <TextArea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                size="fill"
                                label="Video Description"
                                containerClasses={`${classes.video_description_input}`}
                            />

                            <TextField
                                value={price.toString()}
                                onChange={(e) =>
                                    setPrice(parseFloat(e.target.value || "0"))
                                }
                                size="fill"
                                label="Price in $SKY"
                                containerClasses={`${classes.video_title_input}`}
                            />

                            <ButtonComponent
                                title="Upload"
                                width="lg"
                                filled
                                onClick={() => uploadVideoToLivePeer?.()}
                            />
                        </div>
                    </div>
                )}
                {video && status === "loading" && (
                    <div className={classes.progress_container}>
                        <Circle
                            percent={(progress?.[0].progress || 0) * 100}
                            strokeWidth={4}
                            strokeColor="#371622"
                        />
                        {progress?.[0].phase}
                    </div>
                )}
            </div>
        </>
    );
};

export default CreatePage;
