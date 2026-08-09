"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function TransferForm({
  products,
  warehouses,
}: {
  products:any[];
  warehouses:any[];
}) {


  const router = useRouter();


  const [productId,setProductId] = useState("");
  const [fromWarehouse,setFromWarehouse] = useState("");
  const [toWarehouse,setToWarehouse] = useState("");
  const [quantity,setQuantity] = useState("");

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");



  async function submit(e:React.FormEvent){

    e.preventDefault();

    setLoading(true);
    setError("");



    const response = await fetch(
      "/api/inventory/transfer",
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          product_id:Number(productId),

          from_warehouse_id:Number(fromWarehouse),

          to_warehouse_id:Number(toWarehouse),

          quantity:Number(quantity)

        })

      }
    );



    const result = await response.json();



    if(!response.ok){

      setError(result.error);

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


{error &&

<div className="bg-red-100 text-red-700 p-3 rounded">

{error}

</div>

}



<select
className="w-full border p-3 rounded"
value={productId}
onChange={(e)=>setProductId(e.target.value)}
required
>

<option value="">
انتخاب کالا
</option>


{products.map(p=>(

<option key={p.id} value={p.id}>

{p.name}

</option>

))}


</select>




<select
className="w-full border p-3 rounded"
value={fromWarehouse}
onChange={(e)=>setFromWarehouse(e.target.value)}
required
>

<option value="">
انبار مبدا
</option>


{warehouses.map(w=>(

<option key={w.id} value={w.id}>

{w.name}

</option>

))}


</select>





<select
className="w-full border p-3 rounded"
value={toWarehouse}
onChange={(e)=>setToWarehouse(e.target.value)}
required
>

<option value="">
انبار مقصد
</option>


{warehouses.map(w=>(

<option key={w.id} value={w.id}>

{w.name}

</option>

))}


</select>





<input

className="w-full border p-3 rounded"

type="number"

min="1"

placeholder="تعداد انتقال"

value={quantity}

onChange={(e)=>setQuantity(e.target.value)}

required

/>





<button

disabled={loading}

className="bg-green-600 text-white px-6 py-3 rounded"

>

{loading ? "در حال انتقال..." : "ثبت انتقال"}

</button>



</form>

);

}