import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import cloudinary from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../lib/prismadb"

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(500).json({ error: "Error parsing form data" });
            return;
        }

        try {

            const imageUrls: string[] = [];
            // Upload images to Cloudinary
            const fileKeys = Object.keys(files);
            console.log(fileKeys)
            for (let i = 0; i < fileKeys.length; i++) {
                const file = files[fileKeys[i]] as formidable.File;
                console.log(file)
                const result = await cloudinary.v2.uploader.upload(file.filepath);
                console.log(result)
                imageUrls.push(result.secure_url);
            }

            // Save image URLs to database
            const clothes = imageUrls.map((imageUrl) => ({
                image: imageUrl,
                name: "",
                color: "",
                season: "",
                brand: "",
                size: "",
                description: "",
                userId: ""
            }));

            console.log(clothes)

            // const createdClothes = await prisma.clothes.createMany({
            //     data: clothes,
            //     skipDuplicates: true,
            // });

            res.status(200).json({ message: "Clothes added successfully", });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Error adding clothes" });
        }
    });
};

export const config = {
    api: {
        bodyParser: false
    }
}

export default handler;
