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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Home</h1>

        <ul className="mb-6">
          <li>
            <Link href={"/form"}>Form Link</Link>
          </li>
        </ul>

        <hr className="my-6 border-gray-300" />

        <form action={logout} className="flex justify-center">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
