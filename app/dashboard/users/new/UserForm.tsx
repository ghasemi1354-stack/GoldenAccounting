"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function UserForm({
  roles
}:{
  roles:any;
}){


const router = useRouter();


const [username,setUsername] = useState("");
const [password,setPassword] = useState("");
const [fullName,setFullName] = useState("");
const [roleId,setRoleId] = useState("");

const [loading,setLoading] = useState(false);
const [error,setError] = useState("");




async function submit(e:React.FormEvent){

e.preventDefault();

setLoading(true);
setError("");



const res = await fetch("/api/users",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username,

password,

full_name:fullName,

role_id:Number(roleId)

})

});



const data = await res.json();



if(!res.ok){

setError(data.error);

setLoading(false);

return;

}



router.push("/dashboard/users");

}




return (

<form onSubmit={submit} className="space-y-4">


{error && (
<p className="text-red-600">
{error}
</p>
)}



<input

className="w-full border p-3 rounded"

placeholder="نام کاربری"

value={username}

onChange={(e)=>setUsername(e.target.value)}

required

/>




<input

className="w-full border p-3 rounded"

placeholder="نام کامل"

value={fullName}

onChange={(e)=>setFullName(e.target.value)}

required

/>




<input

className="w-full border p-3 rounded"

type="password"

placeholder="رمز عبور"

value={password}

onChange={(e)=>setPassword(e.target.value)}

required

/>




<select

className="w-full border p-3 rounded"

value={roleId}

onChange={(e)=>setRoleId(e.target.value)}

required

>


<option value="">
انتخاب نقش
</option>


{roles.map((role:any)=>(

<option
key={role.id}
value={role.id}
>

{role.name}

</option>

))}


</select>




<button

disabled={loading}

className="bg-green-600 text-white px-6 py-3 rounded"

>

{
loading
?
"در حال ذخیره..."
:
"ثبت کاربر"
}


</button>



</form>

);

}