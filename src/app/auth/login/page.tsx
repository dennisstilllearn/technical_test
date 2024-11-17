"use client";
import { useRouter, useSearchParams } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleLogin = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      let returnUrl = searchParams.get("return");
      returnUrl = (returnUrl && decodeURIComponent(returnUrl)) ?? "/";
      router.push(returnUrl);
    }
  };

  // TODO: Challenge: #4 - Change to use form generator with useFormGenerator hook and do the submit
  // TODO: Optional Challenge #1 - Use tailwindcss to style the login page
  return (
    <div className="container mx-auto w-full md:w-96 mt-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={(event) => handleLogin(event)}>
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
