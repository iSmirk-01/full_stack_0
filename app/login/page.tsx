"use client"

import FormButton from "@/components/ui/FormButton"
import { useState } from "react";
import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

function Login() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            setIsLoading(true)   
            const formData = new FormData(e.target as HTMLFormElement);
            const formValues = Object.fromEntries(formData.entries());
            const response = await fetch(`http://localhost:3000/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formValues)
            });
            const data = await response.json()
            if (response.ok) {
                setMessage(data.success);
                router.push("/")
            } else if (!response.ok) {
                setError(data.error);
            }
        } catch (error) {
            console.error("error fetching: ", error);
        } finally {
            setIsLoading(false)
        }
    };

  return (
    <div className="flex items-center justify-center flex-col h-[100vh] w-full">
      <form
        className="bg-gray-300 dark:bg-zinc-600/30 h-[500px] max-w-[500px] w-full rounded flex flex-col px-8 items-center justify-center gap-8 mx-5 shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-3 items-center border border-black dark:border-white px-3 py-2 rounded">
          <Mail className="text-white" />
          <input
            className="bg-transparent outline-none py-2 px-4 dark:placeholder:text-gray-400 placeholder:text-black/50"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex gap-3 items-center border border-black dark:border-white px-3 py-2 rounded">
          <Lock className="text-white" />
          <input
            className="bg-transparent outline-none py-2 px-4 dark:placeholder:text-gray-400 placeholder:text-black/50"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        {/* Conditionally render the error or success message */}
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <FormButton
          disabled={isLoading}
          isLoading={isLoading}
          text={"Login"}
          loadingText={"Loging in"}
        />
      </form>
    </div>
  );
};

export default Login
