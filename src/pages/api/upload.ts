import fs from "fs/promises";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

import { base64ToFile, getBase64FileExtension } from "@/libs/base64";
import serverAuth from "@/libs/serverAuth";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // 设置请求体大小限制为10MB，你可以根据需要调整大小
    },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);
    const { image } = req.body;

    if (!image) {
      throw new Error("Missing Fields");
    }

    const imageBuffer = base64ToFile(image);

    if (!imageBuffer) {
      throw new Error("Invalid Image");
    }

    const extension = getBase64FileExtension(image);

    // 上传到 /public/uploads
    const fileName = `${currentUser.username}-${Date.now()}.${extension ? extension : "png"}`;
    const filePath = path.join(process.cwd(), `public/uploads/${fileName}`);

    await fs.writeFile(filePath, imageBuffer);

    return res.status(200).json(`/uploads/${fileName}`);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
