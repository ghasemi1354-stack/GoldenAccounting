import { getUserPermissions } from "@/lib/queries/permissions";


export async function hasPermission(
  userId: number,
  permission: string
) {


  const permissions = await getUserPermissions(userId);



  return permissions.includes(permission);


}



export async function getPermissions(
  userId: number
) {


  return await getUserPermissions(userId);


}