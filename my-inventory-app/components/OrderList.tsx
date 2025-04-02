"use client"
import { useEffect, useState } from "react";
import { Order, User, Product } from "@/types";

export default function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [userId, setUserId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        fetchOrders();
        fetchUsers();
        fetchProducts();
    }, []);

    const fetchOrders = async () => {
        const res = await fetch("http://localhost:3000/api/orders");
        const data = await res.json();
        setOrders(data);
    };

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3000/api/users");
        const data = await res.json();
        setUsers(data);
    };

    const fetchProducts = async () => {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        setProducts(data);
    };

    const addOrder = async () => {
        await fetch("http://localhost:3000/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, productId, quantity }),
        });
        fetchOrders();
        setUserId("");
        setProductId("");
        setQuantity("");
    };

    return (
        <div>
            <h2>Orders</h2>
            <select value={userId} onChange={(e) => setUserId(e.target.value)}>
                <option value="">Select User</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <select value={productId} onChange={(e) => setProductId(e.target.value)}>
                <option value="">Select Product</option>
                {products.map((product) => (
                    <option key={product.id} value={product.id}>
                        {product.name}
                    </option>
                ))}
            </select>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
            <button onClick={addOrder}>Add Order</button>
            <ul>
    {orders.map((order) => (
        <li key={order.id}>
            {order.user.name} ordered {order.quantity} of {order.product.name}
        </li>
    ))}
</ul>

        </div>
    );
}
