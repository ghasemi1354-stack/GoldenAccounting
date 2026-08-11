import {getCurrentUser} from "@/lib/auth/currentUser";
import LogoutButton from "./LogoutButton";


export default async function Header(){


const user =
await getCurrentUser();



return (

<header
className="
bg-white
shadow-sm
px-8
py-4
flex
justify-between
items-center
"
>


<div>

<h2
className="
text-xl
font-bold
text-[#0078D4]
"
>
داشبورد سیستم Golden Accounting
</h2>


</div>




<div
className="
flex
items-center
gap-6
"
>


<div
className="text-right"
>


<p
className="
font-bold
"
>
{user?.full_name}
</p>


<p
className="
text-sm
text-gray-500
"
>
{user?.role_name}
</p>


</div>



<LogoutButton/>


</div>



</header>


);


}