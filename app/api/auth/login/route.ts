import sql from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createSession } from "@/lib/auth/session";



export async function POST(request: Request) {


try {


const body = await request.json();


const {
  username,
  password
} = body;



if(!username || !password){


return NextResponse.json(

{
error:"Username and password are required"
},

{
status:400
}

);


}




const users = await sql`

SELECT

u.id,
u.username,
u.password_hash,
u.full_name,
u.role_id,
u.is_active

FROM users u

WHERE u.username=${username}

LIMIT 1

`;




const user = users[0];




if(!user){


return NextResponse.json(

{
error:"Invalid username or password"
},

{
status:401
}

);


}





if(!user.is_active){


return NextResponse.json(

{
error:"User is inactive"
},

{
status:403
}

);


}





const passwordValid = await bcrypt.compare(

password,

user.password_hash

);




if(!passwordValid){


return NextResponse.json(

{
error:"Invalid username or password"
},

{
status:401
}

);


}




const token = await createSession({

id:user.id,

username:user.username,

role_id:user.role_id

});





const response = NextResponse.json(

{

message:"Login successful"

}

);





response.cookies.set(

"golden_session",

token,

{

httpOnly:true,

secure:false,

sameSite:"lax",

maxAge:60*60*8,

path:"/"

}

);





return response;



}

catch(error){


console.error(error);



return NextResponse.json(

{
error:"Server error"
},

{
status:500
}

);


}


}