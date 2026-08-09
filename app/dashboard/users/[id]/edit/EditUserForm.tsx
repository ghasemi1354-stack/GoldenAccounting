"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function EditUserForm({
  user,
  roles
}:{
  user:any;
  roles:any[];
}){


const router = useRouter();


const [fullName,setFullName] = useState(user.full_name);
const [roleId,setRoleId] = useState(String(user.role_id));
const [password,setPassword] = useState("");
const [active,setActive] = useState(user.is_active);

const [loading,setLoading] = useState(false);
const [error,setError] = useState("");



async function submit(e:React.FormEvent){

e.preventDefault();

setLoading(true);
setError("");



const response = await fetch(
`/api/users/${user.id}`,
{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

full_name:fullName,

role_id:Number(roleId),

password,

is_active:active

})

});



const data = await response.json();



if(!response.ok){

setError(data.error);

setLoading(false);

return;

}



router.push("/dashboard/users");


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




<div>

<label>
نام کامل
</label>

<input

className="w-full border p-3 rounded"

value={fullName}

onChange={(e)=>setFullName(e.target.value)}

/>

</div>





<div>

<label>
نقش
</label>


<select

className="w-full border p-3 rounded"

value={roleId}

onChange={(e)=>setRoleId(e.target.value)}

>


{roles.map(role=>(

<option

key={role.id}

value={role.id}

>

{role.name}

</option>

))}


</select>


</div>





<div>

<label>
رمز عبور جدید (اختیاری)
</label>


<input

type="password"

className="w-full border p-3 rounded"

placeholder="در صورت نیاز وارد کنید"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>


</div>





<div className="flex gap-3 items-center">


<input

type="checkbox"

checked={active}

onChange={(e)=>setActive(e.target.checked)}

/>


<label>
کاربر فعال است
</label>


</div>





<button

disabled={loading}

className="bg-blue-600 text-white px-6 py-3 rounded"

>

{loading ? "در حال ذخیره..." : "ذخیره تغییرات"}

</button>



</form>

);


}