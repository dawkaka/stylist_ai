import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prismadb';
import { Configuration, OpenAIApi } from 'openai';
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { Clothes } from "@prisma/client";
import { Clothing } from "@/types";
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
        case "POST":
            try {
                const { occasion, selection, except } = req.body;
                const hasSelection = Array.isArray(selection) && selection.length > 0
                let clothes
                if (hasSelection) {
                    clothes = await prisma.clothes.findMany({ where: { id: { in: selection } } });
                } else {
                    clothes = await prisma.clothes.findMany({ where: { userId } })
                }
                if (!hasSelection) {
                    clothes = clothes.filter(v => {
                        return v.type !== "" && v.description !== "" && v.color !== ""
                    })
                }
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
                console.log(except)

                const prompt = `
                     Using your wardrobe, please provide recommendations for an outfit suitable for the following occasion: ${occasion}. Your wardrobe includes the following clothing items: ${clothing}. Do not recommend any of these exact combinations: ${except}. Please provide your recommendations in JSON format  {"selectedItems":string[], "description":string}, including an array of selected item IDs and a general description of how the items should be worn and why they were chosen. Your recommendations should only include items from the provided wardrobe and should comprise a single outfit. Please do not include accessories unless they are necessary and will complement the outfit.
                `
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: prompt,
                    temperature: 0,
                    max_tokens: clothes.length * 90,
                });
                const recommendations = response.data.choices
                let data = { outfit: [], description: "", selectedItems: [] }
                if (recommendations[0].text) {
                    const t = recommendations[0].text
                    const f = t.indexOf("{")
                    const l = t.lastIndexOf("}")
                    const outfit = t.substring(f, l + 1)
                    console.log(outfit)
                    data = JSON.parse(outfit) || JSON.parse(JSON.stringify(outfit))
                }
                let items: Clothing[] = []
                if (data.outfit && data.outfit.length > 0) {
                    items = await prisma.clothes.findMany({ where: { id: { in: data.outfit } } })
                } else if (data.selectedItems && data.selectedItems.length > 0) {
                    items = await prisma.clothes.findMany({ where: { id: { in: data.selectedItems } } })
                }
                res.status(200).json({ items, generalInfo: data.description });
            } catch (error) {
                res.status(500).json({ message: 'Internal server error' });
            }
            break;

        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
    }

}
