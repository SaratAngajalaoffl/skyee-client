import PocketBase from "pocketbase";

export const pb_client = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_ENDPOINT || "http://127.0.0.1:8090"
);

export const userCollection = pb_client.collection("user");

export const videoCollection = pb_client.collection("video");
