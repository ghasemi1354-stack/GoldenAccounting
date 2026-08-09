"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InventoryInForm({
  products,
  warehouses,
}: {
  products: any[];
  warehouses: any[];
}) {

  const router = useRouter();

  const [productId, setProductId] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [loading, setLoading] = useState(false);


  async function submit(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);


    await fetch("/api/inventory", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        product_id: Number(productId),

        warehouse_id: Number(warehouseId),

        quantity: Number(quantity),

      }),

    });


    setLoading(false);

    router.push("/dashboard");

  }


  return (

    <form
      onSubmit={submit}
      className="bg-white p-6 rounded shadow space-y-4"
    >

      <select
        className="w-full border p-3 rounded"
        value={productId}
        onChange={(e)=>setProductId(e.target.value)}
      >

        <option value="">
          انتخاب کالا
        </option>

        {products.map((p)=>(
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}

      </select>


      <select
        className="w-full border p-3 rounded"
        value={warehouseId}
        onChange={(e)=>setWarehouseId(e.target.value)}
      >

        <option value="">
          انتخاب انبار
        </option>

        {warehouses.map((w)=>(
          <option key={w.id} value={w.id}>
            {w.name}
          </option>
        ))}

      </select>


      <input

        className="w-full border p-3 rounded"

        type="number"

        placeholder="تعداد"

        value={quantity}

        onChange={(e)=>setQuantity(e.target.value)}

      />


      <button

        disabled={loading}

        className="bg-blue-600 text-white px-6 py-3 rounded"

      >

        {loading ? "در حال ثبت..." : "ثبت ورود کالا"}

      </button>


    </form>

  );
}