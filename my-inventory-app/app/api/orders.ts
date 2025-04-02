import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            const { userId, productId, quantity } = req.body;
            const order = await prisma.order.create({ data: { userId, productId, quantity } });
            return res.status(201).json(order);
        }

        if (req.method === "GET") {
            const orders = await prisma.order.findMany({
                include: { user: true, product: true },
            });
            return res.status(200).json(orders);
        }

        if (req.method === "PUT") {
            const { id, quantity } = req.body;
            const order = await prisma.order.update({
                where: { id },
                data: { quantity },
            });
            return res.status(200).json(order);
        }

        if (req.method === "DELETE") {
            const { id } = req.body;
            await prisma.order.delete({ where: { id } });
            return res.status(204).end();
        }

        res.status(405).json({ error: "Method Not Allowed" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
