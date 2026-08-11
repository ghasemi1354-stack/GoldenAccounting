import Link from "next/link";


function price(value:number){

return new Intl.NumberFormat(
"fa-IR"
).format(value) + " تومان";

}



export default function ProductTable({
products,
}:{
products:any[];
}){


return (

<div className="
bg-white
rounded-2xl
shadow
border
overflow-hidden
">


<table className="
w-full
text-right
">


<thead className="
bg-blue-50
">

<tr>


<th className="p-4">
کد
</th>


<th className="p-4">
نام کالا
</th>


<th className="p-4">
دسته
</th>


<th className="p-4">
واحد
</th>


<th className="p-4">
قیمت خرید
</th>


<th className="p-4">
قیمت فروش
</th>


<th className="p-4">
وضعیت
</th>


<th className="p-4">
عملیات
</th>


</tr>

</thead>



<tbody>


{
products.map((product)=>(


<tr
key={product.id}
className="
border-t
hover:bg-gray-50
transition
"
>


<td className="p-4">
{product.code}
</td>


<td className="p-4 font-medium">
{product.name}
</td>


<td className="p-4">
{product.category_name}
</td>


<td className="p-4">
{product.unit_name}
</td>


<td className="p-4">
{price(product.purchase_price)}
</td>


<td className="p-4">
{price(product.sale_price)}
</td>


<td className="p-4">


{
product.is_active

?

<span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-sm
">

فعال

</span>

:

<span className="
bg-red-100
text-red-700
px-3
py-1
rounded-full
text-sm
">

غیرفعال

</span>

}


</td>



<td className="p-4">


<Link

href={`/dashboard/products/${product.id}/edit`}

className="
bg-blue-600
text-white
px-4
py-2
rounded-lg
text-sm
"

>

ویرایش

</Link>


</td>


</tr>


))
}



</tbody>


</table>


</div>

);


}