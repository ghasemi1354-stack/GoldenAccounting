"use client";


import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";



export default function EditProductForm({

id

}:{

id:string

}){


const router=useRouter();


const [loading,setLoading]=useState(true);


const [form,setForm]=useState<any>({});





useEffect(()=>{


fetch(`/api/products/${id}`)

.then(r=>r.json())

.then(data=>{


setForm(data);

setLoading(false);


});


},[id]);






function change(

e:React.ChangeEvent<HTMLInputElement>

){


setForm({

...form,

[e.target.name]:e.target.value


});


}





async function save(){


await fetch(

`/api/products/${id}`,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(form)


}

);



router.push(
"/dashboard/products"
);


router.refresh();


}






if(loading)

return <div>در حال دریافت اطلاعات...</div>;





return (

<div className="
bg-white
rounded-xl
shadow
p-8
space-y-5
">



<input

name="name"

value={form.name || ""}

onChange={change}

className="
w-full
border
rounded-lg
p-3
"

placeholder="نام کالا"

/>





<input

name="code"

value={form.code || ""}

onChange={change}

className="
w-full
border
rounded-lg
p-3
"

placeholder="کد کالا"

/>





<input

name="barcode"

value={form.barcode || ""}

onChange={change}

className="
w-full
border
rounded-lg
p-3
"

placeholder="بارکد"

/>





<input

name="purchase_price"

value={form.purchase_price || ""}

onChange={change}

className="
w-full
border
rounded-lg
p-3
"

placeholder="قیمت خرید"

/>





<input

name="sale_price"

value={form.sale_price || ""}

onChange={change}

className="
w-full
border
rounded-lg
p-3
"

placeholder="قیمت فروش"

/>






<button

onClick={save}

className="
bg-blue-600
hover:bg-blue-700
text-white
px-6
py-3
rounded-xl
"

>


ذخیره تغییرات


</button>



</div>

);


}