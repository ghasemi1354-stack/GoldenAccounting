import sql from "@/lib/db";
import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/auth/guard";


export async function PATCH(
  request: Request,
  {
    params
  }: {
    params: Promise<{
      id:string
    }>
  }
){

try {


await requirePermission(
  "users.edit"
);



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
is_active
}=body;



await sql`

UPDATE users

SET

is_active=${is_active},

updated_at=NOW()

WHERE id=${userId}

`;



return NextResponse.json(
{
message:"Status updated"
}
);



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