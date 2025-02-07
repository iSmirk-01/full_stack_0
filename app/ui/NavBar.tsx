"use client"
import LinkLi from "@/components/ui/LinkLi"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

function NavBar() {
  return (
    <nav className="fixed lg:px-20 h-24 w-full flex justify-between items-center">
        <ThemeToggle />
        <ul className="flex gap-6">
          <LinkLi href={"/"} text={"Home"} />
          <LinkLi href={"/signup"} text={"Signup"} />
          <LinkLi href={"/login"} text={"Login"} />
          <LinkLi href={"/dashboard"} text={"Dashboard"} />
        </ul>
    </nav>
  );
}

export default NavBar
