// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prismadb'

type Data = {
  name: string
  d: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const d = await prisma.user.findMany()
  res.status(200).json({ name: 'John Doe', d })
}
