"use client";

import { useState } from "react";

export default function UserStatusButton({
  id,
  active
}: {
  id: number;
  active: boolean;
}) {

  const [loading,setLoading] = useState(false);
  const [status,setStatus] = useState(active);


  async function changeStatus(){

    setLoading(true);


    const res = await fetch(
      `/api/users/${id}/status`,
      {
        method:"PATCH",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          is_active: !status
        })
      }
    );


    if(res.ok){
      setStatus(!status);
    }


    setLoading(false);

  }


  return (

    <button

      onClick={changeStatus}

      disabled={loading}

      className={
        status
        ? "bg-red-600 text-white px-3 py-1 rounded"
        : "bg-green-600 text-white px-3 py-1 rounded"
      }

    >

      {
        loading
        ? "..."
        : status
        ? "غیرفعال کردن"
        : "فعال کردن"
      }

    </button>

  );

}