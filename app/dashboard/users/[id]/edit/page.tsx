import EditUserForm from "./EditUserForm";
import { getRoles, getUserById } from "@/lib/queries/users";
import { requirePermission } from "@/lib/auth/guard";


export default async function EditUserPage({

  params,

}: {

  params: Promise<{
    id: string
  }>

}) {


  await requirePermission(
    "users.edit"
  );



  const resolvedParams = await params;



  const id = Number(
    resolvedParams.id
  );



  if(Number.isNaN(id)){


    return (

      <div>

        شناسه کاربر نامعتبر است

      </div>

    );


  }



  const user = await getUserById(id);

  const roles = await getRoles();



  if(!user){


    return (

      <div>

        کاربر پیدا نشد

      </div>

    );


  }



  return (

    <div>


      <h1 className="text-2xl font-bold mb-6">

        ویرایش کاربر

      </h1>



      <EditUserForm

        user={user}

        roles={roles}

      />


    </div>

  );


}