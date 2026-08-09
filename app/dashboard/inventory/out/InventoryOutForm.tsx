"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InventoryOutForm({
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
  const [error, setError] = useState("");


  async function submit(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);
    setError("");


    const response = await fetch("/api/inventory", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        product_id: Number(productId),

        warehouse_id: Number(warehouseId),

        quantity: Number(quantity),

        transaction_type: "OUT"

      }),

    });


    const result = await response.json();


    if (!response.ok) {

      setError(result.error || "خطا در ثبت خروج");

      setLoading(false);

      return;

    }


    setLoading(false);

    router.push("/dashboard/inventory");

  }


  return (

    <form
      onSubmit={submit}
      className="bg-white p-6 rounded shadow space-y-4"
    >


      {error && (

        <div className="bg-red-100 text-red-700 p-3 rounded">

          {error}

        </div>

      )}



      <select

        className="w-full border p-3 rounded"

        value={productId}

        onChange={(e)=>setProductId(e.target.value)}

        required

      >

        <option value="">

          انتخاب کالا

        </option>


        {products.map((p)=>(

          <option
            key={p.id}
            value={p.id}
          >

            {p.name}

          </option>

        ))}


      </select>




      <select

        className="w-full border p-3 rounded"

        value={warehouseId}

        onChange={(e)=>setWarehouseId(e.target.value)}

        required

      >

        <option value="">

          انتخاب انبار

        </option>


        {warehouses.map((w)=>(

          <option
            key={w.id}
            value={w.id}
          >

            {w.name}

          </option>

        ))}


      </select>




      <input

        className="w-full border p-3 rounded"

        type="number"

        min="1"

        placeholder="تعداد خروج"

        value={quantity}

        onChange={(e)=>setQuantity(e.target.value)}

        required

      />




      <button

        disabled={loading}

        className="bg-red-600 text-white px-6 py-3 rounded"

      >

        {loading ? "در حال ثبت..." : "ثبت خروج کالا"}

      </button>



    </form>

  );

}