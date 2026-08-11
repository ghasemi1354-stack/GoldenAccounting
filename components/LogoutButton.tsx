"use client";


import { useRouter } from "next/navigation";


export default function LogoutButton(){


  const router = useRouter();



  async function logout(){


    await fetch(
      "/api/auth/logout",
      {
        method:"POST"
      }
    );


    router.replace("/login");


  }



  return (

    <button

      onClick={logout}

      className="bg-red-600 text-white px-4 py-2 rounded"

    >

      خروج

    </button>

  );


}