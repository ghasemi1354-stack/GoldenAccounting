import Link from "next/link";
import { getUsers } from "@/lib/queries/users";
import { requirePermission } from "@/lib/auth/guard";
import UserStatusButton from "@/components/UserStatusButton";


export default async function UsersPage() {


  await requirePermission(
    "users.view"
  );



  const users = await getUsers();



  return (

    <div>


      <div className="flex justify-between items-center mb-6">


        <h1 className="text-2xl font-bold">
          کاربران
        </h1>



        <Link

          href="/dashboard/users/new"

          className="bg-blue-600 text-white px-4 py-2 rounded"

        >
          افزودن کاربر
        </Link>


      </div>





      <table className="w-full bg-white shadow rounded">


        <thead>

          <tr>


            <th className="p-3 text-right">
              نام کاربری
            </th>


            <th className="p-3 text-right">
              نام کامل
            </th>


            <th className="p-3 text-right">
              نقش
            </th>


            <th className="p-3 text-right">
              وضعیت
            </th>


            <th className="p-3 text-right">
              عملیات
            </th>


          </tr>


        </thead>





        <tbody>


          {users.map((user:any)=>(


            <tr key={user.id}>


              <td className="p-3">
                {user.username}
              </td>



              <td className="p-3">
                {user.full_name}
              </td>



              <td className="p-3">
                {user.role_name}
              </td>



              <td className="p-3">

                {
                  user.is_active
                  ? "فعال"
                  : "غیرفعال"
                }

              </td>



              <td className="p-3 flex gap-2">


                <Link

                  href={`/dashboard/users/${user.id}/edit`}

                  className="bg-yellow-500 text-white px-3 py-1 rounded"

                >

                  ویرایش

                </Link>



                <UserStatusButton

                  id={user.id}

                  active={user.is_active}

                />


              </td>



            </tr>


          ))}



        </tbody>


      </table>



    </div>

  );


}