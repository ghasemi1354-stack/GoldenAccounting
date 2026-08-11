export default function InventoryStats({

stats

}:{

stats:any;

}){


return (


<div className="
grid
grid-cols-3
gap-6
mb-8
">



<div className="
bg-white
rounded-xl
shadow
p-6
border
">


<h3 className="
text-gray-500
mb-3
">

کل کالاها

</h3>


<p className="
text-3xl
font-bold
text-blue-600
">

{stats.total}

</p>


</div>





<div className="
bg-white
rounded-xl
shadow
p-6
border
">


<h3 className="
text-gray-500
mb-3
">

کالاهای بحرانی

</h3>


<p className="
text-3xl
font-bold
text-red-600
">

{stats.critical}

</p>


</div>





<div className="
bg-white
rounded-xl
shadow
p-6
border
">


<h3 className="
text-gray-500
mb-3
">

نیاز به سفارش

</h3>


<p className="
text-3xl
font-bold
text-orange-500
">

{stats.reorder}

</p>


</div>



</div>


);


}