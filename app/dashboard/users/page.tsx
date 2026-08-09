import Link from "next/link";
import { getUsers } from "@/lib/queries/users";


export default async function UsersPage() {


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

                {user.is_active
                  ? "فعال"
                  : "غیرفعال"
                }

              </td>



            </tr>


          ))}



        </tbody>


      </table>



    </div>

  );

}