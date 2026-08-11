import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/currentUser";
import { hasPermission } from "@/lib/auth/permissions";



export async function requirePermission(
  permission: string
) {


  const user = await getCurrentUser();



  if (!user) {

    redirect("/login");

  }



  const allowed = await hasPermission(
    user.id,
    permission
  );



  if (!allowed) {

    redirect("/dashboard");

  }



  return user;


}