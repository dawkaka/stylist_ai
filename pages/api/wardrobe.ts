import { PaginatedResult } from "@/types";
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "../../lib/prismadb"
import { NextApiHandler } from 'next';
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session || !session.user) {
        return res.status(401).json({ message: "Login required" })
    }
    switch (req.method) {
        case "GET":
            const { color, brand, fit, type } = req.query
            const skip = parseInt(req.query.page as string)
            const { user } = session;
            const userId = user.id;
            const limit = 10
            const filter: any = { userId }
            if (color) {
                filter.color = color
            }
            if (brand) {
                filter.brand = brand
            }
            if (fit) {
                filter.fit = fit
            }
            if (type) {
                filter.type = type
            }
            try {
                const items = await prisma.clothes.findMany({
                    where: filter,
                    select: { id: true, image: true, brand: true, color: true, fit: true, type: true, description: true },
                    orderBy: { updatedAt: 'desc' },
                    skip,
                    take: limit,
                });

                res.status(200).json({
                    clothes: items,
                    isEnd: items.length < limit,
                    nextFetch: skip + limit
                });

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
