import PocketBase from "pocketbase";

const pb_client = new PocketBase("http://127.0.0.1:8090");

export const userCollection = pb_client.collection("user");

export const videoCollection = pb_client.collection("video");
