import { getInventory, getInventoryStats } from "@/lib/queries/inventory";

import InventoryStats from "@/components/products/InventoryStats";



export default async function InventoryPage(){


const items = await getInventory();


const stats = await getInventoryStats();




function getStatus(item:any){


const stock = Number(item.stock);

const critical = Number(item.critical_stock);

const reorder = Number(item.reorder_point);



if(stock <= critical){

return {

text:"بحرانی",

color:"bg-red-100 text-red-700"

};

}



if(stock <= reorder){

return {

text:"نیاز به سفارش",

color:"bg-orange-100 text-orange-700"

};

}



return {

text:"مناسب",

color:"bg-green-100 text-green-700"

};


}




return (

<div>


<div className="mb-8">


<h1 className="
text-3xl
font-bold
text-gray-800
">

موجودی کالاها

</h1>



<p className="
text-gray-500
mt-2
">

کنترل موجودی، نقطه سفارش و وضعیت تامین کالا

</p>


</div>




<InventoryStats stats={stats}/>





<div className="
bg-white
rounded-xl
shadow
overflow-hidden
">


<table className="w-full">


<thead className="bg-gray-100">


<tr>


<th className="p-4 text-right">
کد کالا
</th>


<th className="p-4 text-right">
نام کالا
</th>


<th className="p-4 text-right">
واحد
</th>


<th className="p-4 text-right">
موجودی
</th>


<th className="p-4 text-right">
حد بحرانی
</th>


<th className="p-4 text-right">
نقطه سفارش
</th>


<th className="p-4 text-right">
وضعیت
</th>


</tr>


</thead>




<tbody>


{

items.map((item:any)=>{


const status = getStatus(item);



return (

<tr

key={item.id}

className="
border-b
hover:bg-gray-50
"


>


<td className="p-4">

{item.code}

</td>



<td className="p-4 font-medium">

{item.name}

</td>



<td className="p-4">

{item.unit_name}

</td>



<td className="
p-4
font-bold
">

{Number(item.stock)}

</td>



<td className="p-4">

{item.critical_stock}

</td>



<td className="p-4">

{item.reorder_point}

</td>



<td className="p-4">


<span

className={`
px-3
py-1
rounded-full
text-sm
font-bold
${status.color}
`}

>

{status.text}

</span>


</td>



</tr>


);


})


}



</tbody>


</table>


</div>



</div>

);


}