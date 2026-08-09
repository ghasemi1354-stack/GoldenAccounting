import Link from "next/link";

export default function Sidebar() {

return (

<aside className="p-6 bg-gray-100 min-h-screen">


  <h2 className="text-xl font-bold mb-8">
    Golden Accounting
  </h2>


  <nav className="flex flex-col gap-4">


    <Link href="/dashboard">
      داشبورد
    </Link>


    <Link href="/dashboard/products">
      کالاها
    </Link>


    <Link href="/dashboard/warehouses">
      انبارها
    </Link>


    <hr />


    <span className="font-bold">
      عملیات انبار
    </span>


    <Link href="/dashboard/inventory">
      موجودی انبار
    </Link>


    <Link href="/dashboard/inventory/in">
      ورود کالا
    </Link>


    <Link href="/dashboard/inventory/out">
      خروج کالا
    </Link>


    <hr />


    <Link href="/dashboard/users">
      کاربران
    </Link>


  </nav>


</aside>

);

}