import { NextResponse } from "next/server";


export async function POST() {


  const response = NextResponse.json({

    message: "Logout successful"

  });



  response.cookies.set(

    "golden_session",

    "",

    {

      httpOnly: true,

      expires: new Date(0),

      path: "/",

      sameSite: "lax",

    }

  );



  return response;


}