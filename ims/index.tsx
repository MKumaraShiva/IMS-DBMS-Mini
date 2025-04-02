import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req:any, res:any) {
  if (req.method === "GET") {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
  }

  if (req.method === "POST") {
    const { name, description, price, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, description, price, stock },
    });
    return res.status(201).json(product);
  }

  res.status(405).json({ message: "Method not allowed" });
}
