"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProductSearch(){

const router = useRouter();

const [value,setValue]=useState("");



function search(){

router.push(
"/dashboard/products?search="+value
);

}



return (

<div className="mb-6">


<input

className="
w-full
bg-white
border
rounded-xl
p-4
outline-none
focus:ring-2
focus:ring-blue-500
"

placeholder="جستجوی نام، کد یا بارکد کالا..."

value={value}

onChange={
e=>setValue(e.target.value)
}

onKeyDown={
e=>{
if(e.key==="Enter")
search()
}
}

/>


</div>

);

}