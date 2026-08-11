export default function ProductStats({
  stats,
}: {
  stats:any;
}) {


return (

<div className="
grid
grid-cols-1
md:grid-cols-3
gap-5
mb-6
">


<div className="
bg-white
rounded-2xl
shadow
p-6
border
">

<h3 className="text-gray-500 mb-3">
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
rounded-2xl
shadow
p-6
border
">

<h3 className="text-gray-500 mb-3">
کالاهای فعال
</h3>

<p className="
text-3xl
font-bold
text-green-600
">

{stats.active}

</p>

</div>




<div className="
bg-white
rounded-2xl
shadow
p-6
border
">

<h3 className="text-gray-500 mb-3">
کالاهای غیرفعال
</h3>

<p className="
text-3xl
font-bold
text-red-600
">

{stats.inactive}

</p>

</div>


</div>

);

}