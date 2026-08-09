export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">
          Golden Accounting
        </h1>

        <p className="text-gray-600 mb-8">
          سیستم مدیریت حسابداری و انبارداری
        </p>

        <a
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          ورود به سیستم
        </a>
      </div>
    </main>
  );
}