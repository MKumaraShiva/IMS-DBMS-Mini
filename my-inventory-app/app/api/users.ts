import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            const { name, email } = req.body;
            const user = await prisma.user.create({ data: { name, email } });
            return res.status(201).json(user);
        }

        if (req.method === "GET") {
            const users = await prisma.user.findMany();
            return res.status(200).json(users);
        }

        if (req.method === "PUT") {
            const { id, name, email } = req.body;
            const user = await prisma.user.update({
                where: { id },
                data: { name, email },
            });
            return res.status(200).json(user);
        }

        if (req.method === "DELETE") {
            const { id } = req.body;
            await prisma.user.delete({ where: { id } });
            return res.status(204).end();
        }

        res.status(405).json({ error: "Method Not Allowed" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}
