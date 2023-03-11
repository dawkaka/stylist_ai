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
                const clothes = await prisma.clothes.findMany({ where: { userId: userId } });
                const clothing = JSON.stringify(clothes)
                const prompt = `Pick clothing recommendations from this list of clothing items only: ${clothing} 
                that is most suitable for the occasion 
                Some context about the occasion: ${occasion}

                rules do not recommend two items of the same type: only one footwear, only one top and only one bottom
               
                the response should be on json format {top: string?, bottom: string?, footwear:string?, accesories: string?, generalInfo: string}
                general info should describe how the recommended items should be worn and why that recommendation
                do not recommned clothing items that are not part of the clothing items provided eg: if there is no item of type accessory, leave the accesories field empty
                Only include accessories if there neccessary and will compliment the outfit
                `

                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: prompt,
                    temperature: 0,
                    max_tokens: 1024,
                });

                const recommendations = response.data.choices

                res.status(200).json(recommendations[0]);
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
