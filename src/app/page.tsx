import { cookies } from "next/headers";
import { logout } from "@/actions/logout";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const cookie = cookies().get("auth");
  if (!cookie) {
    redirect("auth/login");
  }
  return (
    <>
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-black text-left">Home</h1>
          <form action={logout} className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-full hover:bg-gray-600"
            >
              Logout
            </button>
          </form>
        </div>
        <ul className="flex gap-8 mb-6 ml-5 mt-5">
          <li>
            <Link
              href={"/form"}
              className="text-lg font-medium text-indigo-600 hover:text-indigo-800"
            >
              Form Link
            </Link>
          </li>
          <li>
            <Link
              href={"/pokemon"}
              className="text-lg font-medium text-indigo-600 hover:text-indigo-800"
            >
              Pokemon List
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
