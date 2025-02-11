"use client";

import { Mail } from "lucide-react";
import { Lock } from "lucide-react";
import { User } from "lucide-react";
import FormButton from "@/components/ui/FormButton";
import ButtonGoogle from "@/components/ui/ButtonGoogle";
import { useState, useEffect } from "react";
import { useSession, signUp } from "../lib/auth-client";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const  { data: session } = useSession();
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false);

  useEffect(() => {
    setPasswordsMatch(
      password === confirmPassword &&
      password.length >= 1 && 
      confirmPassword.length >= 1
    );
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    console.log(email, password, name)
    try {
      await signUp.email(
        { email, password, name, callbackURL: "/dashboard" },
      {
        onRequest: () => {
          console.log("request sent...");
        },
        onSuccess: () => {
          console.log("Sign up successful!");
          router.push("/dashboard");
          setMessage("Account created!")
        },
        onError: (ctx) => {
          setError(ctx.error.message);
        }
      })
    } catch (error) {
      console.error("Error with register: ", error);
    } finally {
      setIsLoading(false)
    }
  }

  if (session) {
    return (
    <div>
      <p>Already logged in</p>
    </div>
  )
  }

  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <ButtonGoogle />
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
          <User className="text-white" />
          <input
            className="bg-transparent outline-none py-2 px-4 dark:placeholder:text-gray-400 placeholder:text-black/50"
            type="text"
            name="name"
            placeholder="User name"
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
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <div className="flex gap-3 items-center border border-black dark:border-white px-3 py-2 rounded">
          <Lock className="text-white" />
          <input
            className="bg-transparent outline-none py-2 px-4 dark:placeholder:text-gray-400 placeholder:text-black/50"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <FormButton
          disabled={!passwordsMatch || isLoading}
          isLoading={isLoading}
          text={"Sign in"}
          loadingText={"Loading"}
        />
      </form>
    </div>
  );
}

export default Page;
