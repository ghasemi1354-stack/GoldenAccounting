"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleLogin(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);
    setError("");


    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });


    const data = await res.json();


    if (!res.ok) {
      setError(data.message);
      setLoading(false);
      return;
    }


    console.log(data);

    router.push("/dashboard");

  }


  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-100">

      <div className="bg-white p-8 rounded-xl shadow-md w-96">


        <h1 className="text-2xl font-bold text-center mb-6">
          ورود به Golden Accounting
        </h1>


        <form onSubmit={handleLogin}>


          <input
            className="w-full border p-3 rounded mb-4"
            placeholder="نام کاربری"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />


          <input
            className="w-full border p-3 rounded mb-4"
            placeholder="رمز عبور"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />


          {
            error &&
            <p className="text-red-600 mb-4 text-sm">
              {error}
            </p>
          }


          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded"
          >

            {
              loading
              ? "در حال ورود..."
              : "ورود"
            }

          </button>


        </form>


      </div>

    </main>
  );
}