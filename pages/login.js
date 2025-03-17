import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/notes", // redirect to notes page after successful login
    });
    if (res.error) {
      setError(res.error);
    } else {
        // Redirect manually if not automatically redirected:
        router.push("/notes");
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800">
      <div className="w-full max-w-md p-8 bg-gray-100 dark:bg-gray-900 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Log In</h2>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleCredentialsLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Log In
          </button>
        </form>
        <hr className="my-4" />
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Log In with Google
        </button>
        <p className="mt-4 text-center text-gray-700 dark:text-gray-300">
  Don’t have an account?{" "}
  <Link href="/register" className="text-blue-500 hover:underline">
  Register
</Link>

</p>

      </div>
    </div>
  );
}
