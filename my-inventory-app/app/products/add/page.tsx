"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function AddProductPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data:any) => {
    await axios.post("/api/products", data);
    alert("Product added successfully!");
    window.location.href = "/products";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} placeholder="Name" required />
      <input {...register("description")} placeholder="Description" required />
      <input type="number" {...register("price")} placeholder="Price" required />
      <input type="number" {...register("stock")} placeholder="Stock" required />
      <input type="number" {...register("reorderLevel")} placeholder="Reorder Level" required />
      <button type="submit">Add Product</button>
    </form>
  );
}
