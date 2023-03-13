import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';
import { Configuration, OpenAIApi } from 'openai';
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { json } from "stream/consumers";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) {
        return res.status(401).json({ message: "Login required" })
    }
    const { method } = req
    const userId = session.user.id
    switch (method) {
        case "GET":
            try {
                const { occasion } = req.query;
                let clothes = await prisma.clothes.findMany({ where: { userId: userId } });
                clothes = clothes.filter(v => {
                    return v.type !== "" && v.description !== "" && v.color !== ""
                })
                const clothing = JSON.stringify(clothes.map(cloth => {
                    return {
                        id: cloth.id,
                        type: cloth.type,
                        color: cloth.color,
                        brand: cloth.brand,
                        description: cloth.description,
                        fit: cloth.fit
                    }
                }))

                const prompt = `Pick clothing recommendations from this list of clothing items only: ${clothing} 
                that is most suitable for the occasion 
                Some context about the occasion: ${occasion}

                Rules:
                Do not recommend two items of the same type. eg: only one Footwear, only one Top and only one Bottom
                Do not include ambigous items eg: item with type Top and item with type dress if it's neccessary explain how it should be worn in generalInfo
                the response should be on json format {items: string[], generalInfo: string}
                items should be an array of selected items ids
                general info should describe how the recommended items should be worn and why that recommendation.
                do not recommned clothing items that are not part of the clothing items provided eg: if there is no item of type accessory, leave the accesories field empty
                Only include accessories if there neccessary and will compliment the outfit
                `

                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: prompt,
                    temperature: 0,
                    max_tokens: clothes.length * 90,
                });

                const recommendations = response.data.choices
                let data = { items: [], generalInfo: "" }
                console.log(recommendations)
                if (recommendations[0].text) {
                    data = JSON.parse(recommendations[0].text?.replace("Response:", "").trim())
                }
                const items = await prisma.clothes.findMany({ where: { id: { in: data.items } } })
                res.status(200).json({ items, generalInfo: data.generalInfo });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
    }

}
