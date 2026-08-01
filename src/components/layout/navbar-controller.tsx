"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

const HIDE_ON = ["/auth", "/dashboard", "/app"];

export default function NavbarController() {
  const pathname = usePathname();

  if (HIDE_ON.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return null;
  }

  return <Navbar />;
}
