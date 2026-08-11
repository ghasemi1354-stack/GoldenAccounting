import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { hasPermission } from "@/lib/auth/permissions";


export async function requireApiPermission(
  permission: string
) {


  const user = await getCurrentUser();



  if (!user) {


    return {
      error: NextResponse.json(
        {
          error: "Unauthorized"
        },
        {
          status:401
        }
      )
    };


  }





  const allowed = await hasPermission(
    user.id,
    permission
  );




  if (!allowed) {


    return {
      error: NextResponse.json(
        {
          error: "Forbidden"
        },
        {
          status:403
        }
      )
    };


  }




  return {
    user
  };


}