import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiHandler } from 'next';
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "../../lib/prismadb"

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) {
        return res.status(401).json({ message: "Login required" })
    }
    const { user } = session;
    const userId = user.id;

    switch (req.method) {
        case "GET":
            try {
                const distinctValues = await prisma.clothes.groupBy({
                    where: {
                        userId,
                    },
                    by: ["brand", "color", "type", "fit"],
                });

                const filters = {
                    color: Array.from(new Set(distinctValues.map((item) => item.color))),
                    brand: Array.from(new Set(distinctValues.map((item) => item.brand))),
                    fit: Array.from(new Set(distinctValues.map((item) => item.fit))),
                    type: Array.from(new Set(distinctValues.map((item) => item.type))),
                };
                res.status(200).json(filters);
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
            break;

        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method Not Allowed`)
            break;
    }

};

export default handler;
