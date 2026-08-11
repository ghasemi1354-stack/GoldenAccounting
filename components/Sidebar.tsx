import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { hasPermission } from "@/lib/auth/permissions";


export default async function Sidebar(){


const user = await getCurrentUser();


if(!user)
return null;



const canUsers =
await hasPermission(
user.id,
"users.view"
);



return (

<aside
className="
w-72
min-h-screen
bg-[#0f172a]
text-white
p-6
shadow-xl
"
>


<div className="mb-10">


<h1
className="
text-2xl
font-bold
text-[#60CDFF]
"
>
GoldenAccounting
</h1>


<p
className="
text-xs
text-gray-400
mt-2
"
>
سیستم حسابداری و انبارداری
</p>


</div>



<nav
className="
flex
flex-col
gap-2
"
>



<Link
href="/dashboard"
className="
px-4 py-3 rounded-lg
hover:bg-[#0078D4]
transition
"
>
🏠 داشبورد
</Link>



<Link
href="/dashboard/products"
className="
px-4 py-3 rounded-lg
hover:bg-[#0078D4]
transition
"
>
📦 کالاها
</Link>




<Link
href="/dashboard/warehouses"
className="
px-4 py-3 rounded-lg
hover:bg-[#0078D4]
transition
"
>
🏬 انبارها
</Link>




<hr
className="
border-gray-700
my-4
"
/>




<span
className="
text-sm
text-gray-400
px-4
"
>
عملیات انبار
</span>



<Link
href="/dashboard/inventory/in"
className="
px-4 py-3 rounded-lg
hover:bg-[#0078D4]
transition
"
>
⬇ ورود کالا
</Link>


<Link
href="/dashboard/inventory/out"
className="
px-4 py-3 rounded-lg
hover:bg-[#0078D4]
transition
"
>
⬆ خروج کالا
</Link>


<Link
href="/dashboard/inventory/transfer"
className="
px-4 py-3 rounded-lg
hover:bg-[#0078D4]
transition
"
>
🔄 انتقال کالا
</Link>



{
canUsers &&

<>

<hr
className="
border-gray-700
my-4
"
/>


<Link
href="/dashboard/users"
className="
px-4 py-3 rounded-lg
hover:bg-[#0078D4]
transition
"
>
👥 کاربران
</Link>


</>

}



</nav>


</aside>


);


}