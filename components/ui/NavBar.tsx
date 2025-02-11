"use client"

import LinkLi from "@/components/ui/LinkLi";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import LogOutButton from "./LogOutButton";
import { useSession } from "@/app/lib/auth-client";

function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed lg:px-20 h-24 w-full flex justify-between items-center">
      <ThemeToggle />
      <ul className="flex gap-6">
        <LinkLi href={"/"} text={"Home"} />
        <LinkLi href={"/signup"} text={"Signup"} />
        <LinkLi href={"/login"} text={"Login"} />
        <LinkLi href={"/dashboard"} text={"Dashboard"} />
        {session && <LogOutButton />}
      </ul>
    </nav>
  );
}

export default NavBar;
