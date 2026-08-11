import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);



export async function middleware(
  request: NextRequest
) {


const token = request.cookies.get(
  "golden_session"
)?.value;



const { pathname } = request.nextUrl;



// فقط مسیرهای داشبورد محافظت شوند

if(
  pathname.startsWith("/dashboard")
){

  
  if(!token){

    return NextResponse.redirect(
      new URL("/login", request.url)
    );

  }



  try{


    await jwtVerify(
      token,
      secret
    );


  }
  catch(error){


    return NextResponse.redirect(
      new URL("/login", request.url)
    );


  }


}



return NextResponse.next();


}





export const config = {


matcher:[

"/dashboard/:path*"

]


};