"use client"
import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setProducts(data);
    };

    const addProduct = async () => {
        await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price }),
        });
        fetchProducts();
        setName("");
        setPrice("");
    };

    return (
        <div>
            <h2>Products</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
            <button onClick={addProduct}>Add Product</button>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
}
