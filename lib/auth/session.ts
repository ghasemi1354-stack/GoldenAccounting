import { SignJWT, jwtVerify } from "jose";


const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
);



export async function createSession(user:any){


  const token = await new SignJWT({

    id: user.id,

    username: user.username,

    role_id: user.role_id

  })

  .setProtectedHeader({
    alg:"HS256"
  })

  .setIssuedAt()

  .setExpirationTime("8h")

  .sign(secret);



  return token;

}





export async function verifySession(token:string){


  const {payload} = await jwtVerify(
    token,
    secret
  );


  return payload;


}