"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function WarehouseForm() {

  const router = useRouter();


  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  async function submit(e: React.FormEvent) {

    e.preventDefault();


    await fetch("/api/warehouses", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name,
        description
      })

    });


    router.push("/dashboard/warehouses");

  }



  return (

    <form
      onSubmit={submit}
      className="space-y-4 bg-white p-6 rounded shadow"
    >

      <input
        className="w-full border p-3 rounded"
        placeholder="نام انبار"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />


      <textarea

        className="w-full border p-3 rounded"

        placeholder="توضیحات"

        value={description}

        onChange={(e)=>setDescription(e.target.value)}

      />


      <button

        className="bg-blue-600 text-white px-6 py-3 rounded"

      >

        ثبت انبار

      </button>


    </form>

  );

}