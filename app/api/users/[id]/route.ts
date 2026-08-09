import sql from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";



export async function PUT(
  request: Request,
  {
    params
  }:{
    params: Promise<{
      id:string
    }>
  }
){


try {


const {id} = await params;


const userId = Number(id);



if(Number.isNaN(userId)){


return NextResponse.json(
{
error:"Invalid user id"
},
{
status:400
}
);


}




const body = await request.json();



const {
full_name,
role_id,
password,
is_active
}=body;





if(!full_name || !role_id){


return NextResponse.json(

{
error:"Required fields missing"
},

{
status:400
}

);


}






let passwordQuery = "";

let passwordHash = null;




if(password && password.trim() !== ""){


passwordHash = await bcrypt.hash(
password,
10
);


}





if(passwordHash){


await sql`

UPDATE users

SET

full_name=${full_name},

role_id=${role_id},

password_hash=${passwordHash},

is_active=${is_active},

updated_at=NOW()


WHERE id=${userId}


`;



}else{


await sql`

UPDATE users

SET

full_name=${full_name},

role_id=${role_id},

is_active=${is_active},

updated_at=NOW()


WHERE id=${userId}


`;



}





return NextResponse.json({

message:"User updated successfully"

});



}

catch(error){


console.error(error);



return NextResponse.json(

{
error:"Database error"
},

{
status:500
}

);


}


}