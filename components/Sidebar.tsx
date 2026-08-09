import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-white min-h-screen p-5">

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


        <Link href="/dashboard/users">
          کاربران
        </Link>


      </nav>

    </aside>
  );
}