import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import cloudinary from "cloudinary";
import prisma from "../../../../lib/prismadb";
import { authOptions } from "../../auth/[...nextauth]";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    const { method } = req
    const { id } = req.query;
    if (!session || !session.user) {
        return res.status(401).json({ message: "Login required" })
    }

    switch (method) {
        case "PATCH":
            const form = new formidable.IncomingForm();
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    res.status(500).json({ error: "Error parsing form data" });
                    return;
                }

                try {
                    const imageUrls: string[] = [];
                    const fileKeys = Object.keys(files);

                    for (let i = 0; i < fileKeys.length; i++) {
                        const file = files[fileKeys[i]] as formidable.File;
                        const isImage = file.mimetype ? file.mimetype.startsWith("image/") && !file.mimetype.endsWith("gif") ? true : false : false
                        const isLessThan5MB = file.size < 5000000; // 5MB in bytes
                        if (!isImage || !isLessThan5MB) {
                            res.status(400).json({
                                error: `File '${file.originalFilename}' is not a valid image or exceeds the size limit of 5MB`,
                            });
                            return;
                        }
                    }
                    for (let i = 0; i < fileKeys.length; i++) {
                        const file = files[fileKeys[i]] as formidable.File;
                        const result = await cloudinary.v2.uploader.upload(file.filepath);
                        imageUrls.push(result.secure_url);
                    }
                    if (imageUrls[0]) {
                        await prisma.clothes.update({ where: { id: id as string }, data: { image: imageUrls[0] } })
                    }
                    res.status(200).json({ message: "Clothe image updated successfully" });

                } catch (error) {
                    res.status(500).json({ error: "Error adding clothes" });
                }
            })
            break;
        default:
            res.setHeader('Allow', ['PATCH'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
};

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler