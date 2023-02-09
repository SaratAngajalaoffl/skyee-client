import classes from "./CreatePage.module.scss";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import Image from "next/image";

import uploadIcon from "@/assets/images/upload.png";
import HeadComponent from "@/components/head/HeadComponent";
import ReactPlayer from "react-player";
import TextField from "@/components/input/TextField";
import TextArea from "@/components/input/TextArea";
import ButtonComponent from "@/components/buttons/ButtonComponent";

const videoTypes = ["MP4"];
const thumbnailTypes = ["GIF", "PNG", "WEBP", "JPEG"];

const CreatePage = () => {
    const [video, setVideo] = useState<File | null>(null);
    const [thumbnail, setThumbail] = useState<File | null>(null);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

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
                {!video ? (
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
                ) : (
                    <div className={classes.video_details}>
                        <div className={classes.uploaded_video}>
                            <ReactPlayer
                                url={URL.createObjectURL(video)}
                                controls={true}
                            />
                        </div>
                        <form className={classes.details_form}>
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
                                    setPrice(parseFloat(e.target.value))
                                }
                                size="fill"
                                label="Price in $SKY"
                                containerClasses={`${classes.video_title_input}`}
                            />

                            <ButtonComponent
                                title="Upload"
                                width="lg"
                                filled
                                onClick={() => {}}
                            />
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default CreatePage;
