"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ProductForm({
  categories,
  units
}: {
  categories: any[];
  units: any[];
}) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    setLoading(true);


    const form = new FormData(e.currentTarget);


    const data = {
      code: form.get("code"),
      barcode: form.get("barcode"),
      name: form.get("name"),
      category_id: Number(form.get("category_id")),
      unit_id: Number(form.get("unit_id")),
      purchase_price: Number(form.get("purchase_price")),
      sale_price: Number(form.get("sale_price")),
    };


    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });


    if (res.ok) {
      router.push("/dashboard/products");
      router.refresh();
    }
    else {
      alert("خطا در ثبت کالا");
    }


    setLoading(false);

  }


  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded shadow"
    >


      <input
        name="code"
        placeholder="کد کالا"
        className="w-full border p-3 rounded"
      />


      <input
        name="barcode"
        placeholder="بارکد"
        className="w-full border p-3 rounded"
      />


      <input
        name="name"
        placeholder="نام کالا"
        className="w-full border p-3 rounded"
      />


      <select
        name="category_id"
        className="w-full border p-3 rounded"
      >

        <option value="">
          انتخاب دسته بندی
        </option>

        {categories.map((item)=>(
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}

      </select>


      <select
        name="unit_id"
        className="w-full border p-3 rounded"
      >

        <option value="">
          انتخاب واحد
        </option>

        {units.map((item)=>(
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}

      </select>


      <input
        name="purchase_price"
        placeholder="قیمت خرید"
        className="w-full border p-3 rounded"
      />


      <input
        name="sale_price"
        placeholder="قیمت فروش"
        className="w-full border p-3 rounded"
      />


      <button
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        {loading ? "در حال ثبت..." : "ذخیره کالا"}
      </button>


    </form>

  );

}