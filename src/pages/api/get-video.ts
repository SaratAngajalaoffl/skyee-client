// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAdminWallet } from "@/utils/admin-ethers";
import { userCollection, videoCollection } from "@/utils/pocketbase";
import type { NextApiRequest, NextApiResponse } from "next";

import { ethers } from "ethers";
import sky_artifact from "@/artifacts/sky_artifact.json";
import { VideoRecord } from "types/pocketbase-types";
import { Record } from "pocketbase";

type Data = {
    video: VideoRecord & Record;
    txhash: string;
};

type Error = {
    errmsg: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Error>
) {
    if (req.method === "POST") {
        try {
            const adminWallet = getAdminWallet();
            const adminAddress = adminWallet.address;
            const { signature, videoId, userId } = req.body;

            const userRecord = await userCollection.getOne(userId);
            const videoRecord = await videoCollection.getOne(videoId);

            const message = JSON.stringify({
                userId,
                videoId,
                nonce: userRecord.nonce,
            });

            const pubKey = ethers.utils.verifyMessage(message, signature);

            if (pubKey !== userRecord.address)
                return res.status(401).json({ errmsg: "Invalid Signature" });

            const contract = new ethers.Contract(
                process.env.NEXT_PUBLIC_SKY_TOKEN_ADDRESS || "",
                sky_artifact.abi,
                adminWallet
            );

            const skyApproved: ethers.BigNumber = await contract.allowance(
                pubKey,
                adminAddress
            );

            const price = ethers.utils.parseEther(videoRecord.price.toString());

            if (skyApproved.lt(price))
                return res
                    .status(400)
                    .json({ errmsg: "Allowance not sufficient" });

            const uploader = await userCollection.getOne(videoRecord.uploader);

            const nonce = await adminWallet.getTransactionCount();

            const tx = await contract.transferFrom(
                pubKey,
                uploader.address,
                price,
                {
                    nonce,
                }
            );

            await userCollection.update(userId, { nonce: nonce + 1 });
            // await tx.wait();

            res.status(201).json({
                video: videoRecord as VideoRecord & Record,
                txhash: tx.hash,
            });
        } catch (err: any) {
            res.status(401).json({ errmsg: err.message });
        }
    } else {
        res.status(404).json({ errmsg: "Route not found" });
    }
}
