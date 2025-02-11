"use client"

import { signOut } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";

function LogOutButton() {
const router = useRouter();
  return (
    <button className="text-red-500 bg-black rounded"  onClick={async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login")
          }
        }
      })
    }}>
      logout
    </button>
  );
}

export default LogOutButton
