// components/ButtonGoogle.tsx
import { signIn } from "@/app/lib/auth-client";

function ButtonGoogle() {
  return (
    <button
      onClick={async () => {
        try {
          await signIn.social({
            provider: "google", // Specify Google as the provider
            callbackURL: "/", // Redirect after successful sign-in
            errorCallbackURL: "/", // Redirect if there's an error
          });
        } catch (error) {
          console.error("Error during Google sign-in:", error);
        }
      }}
      className="bg-white px-4 py-2 rounded-md shadow-md hover:bg-gray-200"
    >
      Sign in with Google
    </button>
  );
}

export default ButtonGoogle;
