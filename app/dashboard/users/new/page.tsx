import UserForm from "./UserForm";
import { getRoles } from "@/lib/queries/users";


export default async function NewUserPage(){


  const roles = await getRoles();



  return (

    <div>


      <h1 className="text-2xl font-bold mb-6">

        افزودن کاربر

      </h1>



      <UserForm

        roles={roles}

      />


    </div>

  );


}